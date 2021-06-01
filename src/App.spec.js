import React from "react";
import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import App from "./App";

describe("<HomePage />", () => {
  let wrapper = null;
  beforeEach(() => {
    wrapper = shallow(<App />);
  });
  it("should render correctly", () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
