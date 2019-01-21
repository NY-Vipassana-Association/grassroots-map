import React from "react";
import { IOldStudentDataItem } from "../../types";

interface IProps {
  regionName: IOldStudentDataItem["region_name"];
  regionalContact: string;
}

export default class RegionalContactInfo extends React.Component<IProps> {
  render() {
    const { regionName, regionalContact } = this.props;

    return (
      <div>
        <p>
          Interested in connecting with your local old-student community? Reach
          out to our community organizer for {regionName}:
        </p>
        {regionalContact.split("\\n").map((regionalContactLine, index) => (
          <p style={{ margin: 0 }} key={index}>
            {regionalContactLine}
          </p>
        ))}
      </div>
    );
  }
}
