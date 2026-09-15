export default {
  async fetch(request, env) {
    const cors = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization"
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: cors });
    }

    const url = new URL(request.url);

    const json = (data, status = 200) =>
      new Response(JSON.stringify(data), {
        status,
        headers: {
          "Content-Type": "application/json",
          ...cors
        }
      });

    const secret =
      env.ADMIN_PASSWORD ||
      env.ADMIN_SECRET ||
      env.ADMIN ||
      env.ADMIN_TOKEN;

    const auth = request.headers.get("Authorization") || "";
    const token = auth.startsWith("Bearer ")
      ? auth.slice(7)
      : "";

    function adminOK() {
      return secret && token === secret;
    }

    /*
      =========================
      ADMIN LOGIN
      =========================
    */

    if (url.pathname === "/api/admin/login") {
      if (request.method !== "POST") {
        return json({ error: "Method not allowed" }, 405);
      }

      try {
        const body = await request.json();

        if (!secret) {
          return json({
            error: "ADMIN secret belum dipasang di Worker"
          }, 500);
        }

        if (!body.password || body.password !== secret) {
          return json({
            error: "Password salah"
          }, 401);
        }

        return json({
          success: true,
          token: secret
        });
      } catch {
        return json({
          error: "Request tidak sah"
        }, 400);
      }
    }

    /*
      =========================
      PUBLIC ACCOUNTS
      =========================
    */

    if (url.pathname === "/api/accounts") {
      if (request.method !== "GET") {
        return json({ error: "Method not allowed" }, 405);
      }

      try {
        const result = await env.PAID_DB.prepare(`
          SELECT
            id,
            game,
            account_name,
            username,
            price,
            details,
            image_url,
            status,
            created_at
          FROM accounts
          WHERE status = 'AVAILABLE'
          ORDER BY id DESC
        `).all();

        return json({
          success: true,
          accounts: result.results || []
        });
      } catch (error) {
        return json({
          error: "Database error"
        }, 500);
      }
    }

    /*
      =========================
      ADMIN LIST
      =========================
    */

    if (url.pathname === "/api/admin/accounts") {
      if (!adminOK()) {
        return json({ error: "Unauthorized" }, 401);
      }

      if (request.method === "GET") {
        try {
          const result = await env.PAID_DB.prepare(`
            SELECT *
            FROM accounts
            ORDER BY id DESC
          `).all();

          return json({
            success: true,
            accounts: result.results || []
          });
        } catch {
          return json({
            error: "Database error"
          }, 500);
        }
      }

      /*
        =========================
        ADD ACCOUNT
        =========================
      */

      if (request.method === "POST") {
        try {
          const body = await request.json();

          if (!body.game || !body.account_name || body.price === undefined) {
            return json({
              error: "Game, nama account dan harga diperlukan"
            }, 400);
          }

          const result = await env.PAID_DB.prepare(`
            INSERT INTO accounts
            (
              game,
              account_name,
              username,
              price,
              details,
              image_url,
              status
            )
            VALUES (?, ?, ?, ?, ?, ?, ?)
          `)
          .bind(
            body.game,
            body.account_name,
            body.username || "",
            Number(body.price),
            body.details || "",
            body.image_url || "",
            body.status || "AVAILABLE"
          )
          .run();

          return json({
            success: true,
            id: result.meta.last_row_id
          });
        } catch (error) {
          return json({
            error: "Gagal tambah account"
          }, 500);
        }
      }
    }

    /*
      =========================
      ADMIN ACCOUNT BY ID
      =========================
    */

    const match = url.pathname.match(
      /^\/api\/admin\/accounts\/(\d+)$/
    );

    if (match) {
      if (!adminOK()) {
        return json({ error: "Unauthorized" }, 401);
      }

      const id = Number(match[1]);

      /*
        UPDATE
      */

      if (request.method === "PUT") {
        try {
          const body = await request.json();

          await env.PAID_DB.prepare(`
            UPDATE accounts
            SET
              game = ?,
              account_name = ?,
              username = ?,
              price = ?,
              details = ?,
              image_url = ?,
              status = ?
            WHERE id = ?
          `)
          .bind(
            body.game,
            body.account_name,
            body.username || "",
            Number(body.price),
            body.details || "",
            body.image_url || "",
            body.status || "AVAILABLE",
            id
          )
          .run();

          return json({
            success: true
          });
        } catch {
          return json({
            error: "Gagal update account"
          }, 500);
        }
      }

      /*
        DELETE
      */

      if (request.method === "DELETE") {
        try {
          await env.PAID_DB.prepare(`
            DELETE FROM accounts
            WHERE id = ?
          `)
          .bind(id)
          .run();

          return json({
            success: true
          });
        } catch {
          return json({
            error: "Gagal delete account"
          }, 500);
        }
      }

      return json({
        error: "Method not allowed"
      }, 405);
    }

    /*
      =========================
      HIDE / AVAILABLE
      =========================
    */

    if (url.pathname === "/api/admin/status") {
      if (!adminOK()) {
        return json({ error: "Unauthorized" }, 401);
      }

      if (request.method !== "PUT") {
        return json({
          error: "Method not allowed"
        }, 405);
      }

      try {
        const body = await request.json();

        if (!body.id || !body.status) {
          return json({
            error: "ID dan status diperlukan"
          }, 400);
        }

        await env.PAID_DB.prepare(`
          UPDATE accounts
          SET status = ?
          WHERE id = ?
        `)
        .bind(body.status, Number(body.id))
        .run();

        return json({
          success: true
        });
      } catch {
        return json({
          error: "Gagal ubah status"
        }, 500);
      }
    }

    /*
      =========================
      DASHBOARD STATS
      =========================
    */

    if (url.pathname === "/api/admin/stats") {
      if (!adminOK()) {
        return json({ error: "Unauthorized" }, 401);
      }

      try {
        const total = await env.PAID_DB.prepare(`
          SELECT COUNT(*) AS total
          FROM accounts
        `).first();

        const available = await env.PAID_DB.prepare(`
          SELECT COUNT(*) AS total
          FROM accounts
          WHERE status = 'AVAILABLE'
        `).first();

        const hidden = await env.PAID_DB.prepare(`
          SELECT COUNT(*) AS total
          FROM accounts
          WHERE status = 'HIDDEN'
        `).first();

        return json({
          success: true,
          total: Number(total?.total || 0),
          available: Number(available?.total || 0),
          hidden: Number(hidden?.total || 0)
        });
      } catch {
        return json({
          error: "Stats error"
        }, 500);
      }
    }

    return json({
      error: "Not found"
    }, 404);
  }
};
