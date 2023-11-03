import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import BlogForm from "./BlogForm";

test("<BlogForm /> form calls the event handler it received as props with the right details when a new blog is created", async () => {
  const createBlog = jest.fn();
  const user = userEvent.setup();

  render(<BlogForm createBlog={createBlog} />);

  const inputs = screen.getAllByRole("textbox");
  const sendButton = screen.getByText("Save");

  await user.type(inputs[0], "testing a form...");
  await user.click(sendButton);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toBe("testing a form...");

});
