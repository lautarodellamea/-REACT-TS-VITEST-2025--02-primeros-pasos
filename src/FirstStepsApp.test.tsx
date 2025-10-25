import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, test, vi } from "vitest";
import { FirstStepsApp } from "./FirstStepsApp";

// con el fn podemos simular peticionse, etc, podemos ver cuantas veces fue llamado, con que valores, etc
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const mockItemCounter = vi.fn((_props: unknown) => {
  return <div data-testid="ItemCounter" />;
});

// un mock es algo ficticio que reemplaza a un componente real, en este caso el ItemCounter
vi.mock("./shopping-cart/ItemCounter", () => ({
  ItemCounter: (props: unknown) => mockItemCounter(props),
}));

// hacemos un mock del ItemCounter
// cuando alguien llame a ese componente le vamos a devolver un modulo que definimos aca
// vi.mock("./shopping-cart/ItemCounter", () => ({
//   ItemCounter: (props: unknown) => (
//     <div
//       data-testid="ItemCounter"
//       name={props.name}
//       quantity={props.quantity}
//     />
//   ),
// }));

describe("FirstStepsApp", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test("should match snapshot", () => {
    const { container } = render(<FirstStepsApp />);

    expect(container).toMatchSnapshot();
  });

  test("should render the correct number of ItemCounter components", () => {
    render(<FirstStepsApp />);

    const itemCounters = screen.getAllByTestId("ItemCounter");

    // console.log(itemCounters);

    expect(itemCounters.length).toBe(3);

    // screen.debug();
  });

  test("should render ItemCounter with correct props", () => {
    render(<FirstStepsApp />);

    // ojo el componente se renderiza 9 veces porque en las pruebas anteriores lo renderizamos 3 veces, recordar que cada prueba debe ser atomica e independiente entre si, esta no deberia depender del resultado de las demas pruebas
    // esto se soluciona con afterEach, que se ejecuta antes de cada prueba y limpiamos todos los mocks
    expect(mockItemCounter).toHaveBeenCalledTimes(3);

    // testeamos que se llame con los valores correctos cada vez
    expect(mockItemCounter).toHaveBeenCalledWith({
      name: "Nintendo Switch 2",
      quantity: 1,
    });
    expect(mockItemCounter).toHaveBeenCalledWith({
      name: "Pro Controller",
      quantity: 2,
    });
    expect(mockItemCounter).toHaveBeenCalledWith({
      name: "Super Smash",
      quantity: 5,
    });
  });
});
