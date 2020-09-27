import React from "react";
import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import { Launch } from "../Launch";

describe("<HomePage />", () => {
  let wrapper = null;
  const data = {
    flight_number: "1",
    launch_success: true,
    launch_year: "2009",
    links: {
      mission_patch_small: '"https://images2.imgbox.com/3c/0e/T8iJcSN3_o.png"',
    },
    mission_name: "FalconSat",
    mission_id: ["EE12345", "EE12345"],
    rocket: {
      first_stage: {
        cores: [
          {
            land_success: true,
          },
        ],
      },
    },
  };

  beforeEach(() => {
    wrapper = shallow(<Launch mission={data} />);
  });
  it("should render correctly", () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
