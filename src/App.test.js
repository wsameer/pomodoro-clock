import { render } from "@testing-library/react";
import App from "./App";

test("renders the app properly", () => {
    const { container } = render(<App />);
    expect(container).toMatchSnapshot();
});
