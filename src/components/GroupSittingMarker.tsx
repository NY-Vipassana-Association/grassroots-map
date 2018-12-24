import React from "react";
import Leaflet from "leaflet";
import { Marker, Popup } from "react-leaflet";

import { IGroupSitting } from "../types/index";
import groupSittingIconUrl from "../groupSittingIcon.svg";

interface IProps {
  groupSitting: IGroupSitting;
}

const icon = Leaflet.icon({
  iconUrl: groupSittingIconUrl,
  iconSize: [30, 30]
});

export default class GroupSittingMarker extends React.Component<IProps> {
  render() {
    const { groupSitting } = this.props;

    return (
      <Marker icon={icon} position={groupSitting.position}>
        <Popup>
          <div data-test={`group-sitting-popup-${groupSitting.name}`}>
            <h3>Group Sitting</h3>Host: {groupSitting.name}
            <p>{groupSitting.address} (contact host for full address)</p>
            <p>{groupSitting.time}</p>
            <p>
              {groupSitting.email}
              {groupSitting.email && <br />}
              {groupSitting.phoneNumber}
            </p>
          </div>
        </Popup>
      </Marker>
    );
  }
}
