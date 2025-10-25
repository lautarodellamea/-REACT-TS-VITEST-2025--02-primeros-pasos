import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";

import { MyAwesomeApp } from "./MyAwesomeApp";

describe("MyAwesomeApp", () => {
  test("should render firstName and lastName", () => {
    // console.log(document.body); // esto me lo habilita vitest

    // podemos usar el container o el screen
    // al hacer un click o un evento el container no se actualiza pero el screen si, por lo tanto para estados iniciales si poriamos usar el container
    // VER vite.config.ts
    const { container } = render(<MyAwesomeApp />);

    // console.log(container.innerHTML);

    const h1 = container.querySelector("h1"); // devuelve el primer h1 que encuentre
    const h3 = container.querySelector("h3"); // devuelve el primer h3 que encuentre
    // console.log(h1?.innerHTML);

    expect(h1?.innerHTML).toContain("Fernando");
    expect(h3?.innerHTML).toContain("Herrera");
  });

  test("should render firstName and lastName - screen", () => {
    // FERNANDO RECOMIENDA USAR SCREEN

    render(<MyAwesomeApp />);

    // screen.debug(); // me muestra el DOM en consola bien estructurado

    const h1 = screen.getByTestId("first-name-title");
    expect(h1.innerHTML).toContain("Fernando");
  });

  test("should match snapshot", () => {
    const { container } = render(<MyAwesomeApp />);

    // el snapshot crea una carpeta para guardar los snapshots, la carpeta se llama __snapshots__ y si va en el repositorio
    // con "u" actualizariamos el snapshot en caso de cambios
    // se recomienda usarlos cuando sabemos que ese componente no va a ser modificado a lo largo del tiempo
    expect(container).toMatchSnapshot();
  });
});
