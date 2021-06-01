import React from "react";
import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import { HomePage } from "../HomePage";

describe("<HomePage />", () => {
  let wrapper = null;
  beforeEach(() => {
    wrapper = shallow(<HomePage />);
  });
  it("should render correctly", () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
