import React from "react";
import { IRegionalContact } from "../../types/index";

interface IProps {
  regionalContact: IRegionalContact;
}

export default class RegionalContactInfo extends React.Component<IProps> {
  render() {
    const { regionalContact } = this.props;

    return (
      <p>
        Interested in connecting with the local Brooklyn old-student community?
        Reach out to our Brooklyn Community Organizer, {regionalContact.name},
        at {regionalContact.emailAddress} or {regionalContact.phoneNumber}.
      </p>
    );
  }
}
