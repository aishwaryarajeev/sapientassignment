import React from "react";
import { shallow, mount } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import { Launches } from "../Launches";

describe("<Launches />", () => {
  let wrapper = null;
  beforeEach(() => {
    wrapper = shallow(
      <Launches endPoint={"https://api.spaceXdata.com/v3/launches?limit=100"} />
    );
  });
  it("should render correctly", () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it("should mount correctly", () => {
    wrapper = mount(
      <Launches endPoint={"https://api.spaceXdata.com/v3/launches?limit=100"} />
    );
    wrapper.update();

    expect(wrapper.find("Launch")).toBeTruthy();
  });
});
