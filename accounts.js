const accounts = [
    {
        name: "ACCOUNT GAME #001",
        game: "GAME ACCOUNT",
        price: "CONTACT ADMIN",
        status: "AVAILABLE",
        image: "",
        description: "Account sedang tersedia untuk dipromosikan."
    },
    {
        name: "ACCOUNT GAME #002",
        game: "GAME ACCOUNT",
        price: "CONTACT ADMIN",
        status: "AVAILABLE",
        image: "",
        description: "Account sedang tersedia untuk dipromosikan."
    }
];


function openAccountWhatsApp(accountName) {

    const number = "60143783301";

    const text =
        "HI XNZ, SAYA BERMINAT DENGAN ACCOUNT: " +
        accountName +
        ".%0A%0ASAYA MAHU TANYA DETAIL ACCOUNT.";

    const url =
        "https://wa.me/" +
        number +
        "?text=" +
        text;

    window.open(
        url,
        "_blank",
        "noopener,noreferrer"
    );
}
