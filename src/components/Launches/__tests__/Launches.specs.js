import React from "react";
import { shallow, mount } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import { Launches } from "../Launches";

describe("<Launches />", () => {
  let wrapper = null;
  beforeEach(() => {
    wrapper = shallow(<Launches />);
  });
  it("should render correctly", () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it("should render correctly", () => {
    wrapper = mount(<Launches />);
    wrapper.update();

    expect(wrapper.find("Launch")).toBeTruthy();
  });
});
