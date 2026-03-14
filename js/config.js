// Tailwind CSS Configuration
tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#1152d4",
        "background-light": "#f6f6f8",
        "background-dark": "#101622",
      },
      fontFamily: {
        display: ["Manrope", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        "2xl": "1rem",
        full: "9999px",
      },
    },
  },
};

function drawX() {
  for (let i = 0; i < 5; i++) {
    let row = ""; // Creamos un texto vacío para esta fila
    for (let j = 0; j < 5; j++) {
      if (i === j || i + j === 4) {
        row += "*"; // Concatenamos el asterisco
      } else {
        row += " "; // Concatenamos el espacio
      }
    }
    console.log(row); // Imprimimos la fila completa antes de pasar a la siguiente
  }
}

drawX();

function drawx2() {
  let array = [
    ["*", " ", " ", " ", "*"],
    [" ", "*", " ", "*", " "],
    [" ", " ", "*", " ", " "],
    [" ", "*", " ", "*", " "],
    ["*", " ", " ", " ", "*"],
  ];
  console.log(array.map((row) => row.join("")).join("\n"));
}
drawx2();
