import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Togglable from "./Togglable";
import Blog from "./Blog";

describe("<Togglable />", () => {
  let container;
  let aBlog = {
    title: "how to make friends and influence people?",
    author: "Sir Lancealot",
    url: "https://camelot.com/",
    likes: 12,
  };

  let mockUpdateBlog = jest.fn();
  let mockDeleteBlog = jest.fn();

  beforeEach(() => {
    container = render(
      <Togglable buttonLabel="show...">
        <div className="testDiv">togglable content</div>
      </Togglable>
    ).container;
  });

  test("renders its children", async () => {
    await screen.findAllByText("togglable content");
  });

  test("at start the children are not displayed", () => {
    const div = container.querySelector(".togglableContent");
    expect(div).toHaveStyle("display: none");
  });

  test("after clicking the button, children are displayed", async () => {
    const user = userEvent.setup();
    const button = screen.getByText("show...");
    await user.click(button);

    const div = container.querySelector(".togglableContent");
    expect(div).not.toHaveStyle("display: none");
  });

  test("toggled content can be closed", async () => {
    const user = userEvent.setup();
    const button = screen.getByText("show...");
    await user.click(button);

    const closeButton = screen.getByText("Cancel");
    await user.click(closeButton);

    const div = container.querySelector(".togglableContent");
    expect(div).toHaveStyle("display: none");
  });

  test("clicking the show displays url and likes", async () => {
    const component = render(
      <Blog
        blog={aBlog}
        updateBlog={mockUpdateBlog}
        deleteBlog={mockDeleteBlog}
      />
    );

    const user = userEvent.setup();
    const button = component.getByText("Show");
    await user.click(button);

    expect(component.container).toHaveTextContent(
      "how to make friends and influence people?"
    );

    expect(component.container).toHaveTextContent("12");
  });

  test(" if the like button is clicked twice, the event handler the component received as props is called twice", async () => {
    const component = render(
      <Blog
        blog={aBlog}
        updateBlog={mockUpdateBlog}
        deleteBlog={mockDeleteBlog}
      />
    );

    const user = userEvent.setup();

    const button = component.getByText("❤ like");
    await user.click(button);
    await user.click(button);

    expect(component.container).toHaveTextContent("13");
  });
});
