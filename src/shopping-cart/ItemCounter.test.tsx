import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { ItemCounter } from "./ItemCounter";

describe("ItemCounter", () => {
  test("should render with default values", () => {
    const name = "Test item";

    render(<ItemCounter name={name} />);

    expect(screen.getByText(name)).toBeDefined();
    expect(screen.getByText(name)).not.toBeNull();
  });

  test("should render with custom quantity", () => {
    const name = "Control Nintendo";
    const quantity = 10;

    render(<ItemCounter name={name} quantity={quantity} />);

    expect(screen.getByText(quantity)).toBeDefined();
  });

  test("should increase count when +1 button is pressed", () => {
    render(<ItemCounter name={"Control Nintendo"} quantity={1} />);

    // desectructuro para acceder  a todos los botones en orden
    const [buttonAdd] = screen.getAllByRole("button");

    // test de eventos
    // cuidado y hacerlo en ambiente de pruebas porque ejecuta llamadas a apis, creacion de cosas, etc
    fireEvent.click(buttonAdd);

    expect(screen.getByText("2")).toBeDefined();
  });

  test("should decrease count when -1 button is pressed", () => {
    render(<ItemCounter name={"Control Nintendo"} quantity={5} />);

    // desectructuro para acceder  al boton especifico
    const [, buttonSubtract] = screen.getAllByRole("button");

    fireEvent.click(buttonSubtract);

    expect(screen.getByText("4")).toBeDefined();
  });

  test("should decrease count when -1 button is pressed", () => {
    const quantity = 5;

    render(<ItemCounter name={"Control Nintendo"} quantity={quantity} />);

    // desectructuro para acceder  al boton especifico
    const [, buttonSubtract] = screen.getAllByRole("button");

    fireEvent.click(buttonSubtract);

    expect(screen.getByText("4")).toBeDefined();
  });

  test("should not decrease count when -1 button is pressed and quantity is 1", () => {
    const quantity = 1;

    render(<ItemCounter name={"Control Nintendo"} quantity={quantity} />);

    // desectructuro para acceder  al boton especifico
    const [, buttonSubtract] = screen.getAllByRole("button");

    fireEvent.click(buttonSubtract);

    expect(screen.getByText("1")).toBeDefined();
  });

  test("should change to red when quantity is 1", () => {
    const quantity = 1;
    const name = "Control Nintendo";

    render(<ItemCounter name={name} quantity={quantity} />);

    const itemText = screen.getByText(name);

    expect(itemText.style.color).toBe("red");
  });

  test("should change to black when quantity is greater than 1", () => {
    const quantity = 2;
    const name = "Control Nintendo";

    render(<ItemCounter name={name} quantity={quantity} />);

    const itemText = screen.getByText(name);

    expect(itemText.style.color).toBe("black");
  });
});
