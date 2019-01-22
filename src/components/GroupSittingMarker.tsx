import React from "react";
import Leaflet from "leaflet";
import { Marker, Popup } from "react-leaflet";

import { IGroupSitting } from "../types";
import groupSittingIconUrl from "../groupSittingIcon.svg";

interface IProps {
  groupSitting: IGroupSitting;
}

const icon = Leaflet.icon({
  iconUrl: groupSittingIconUrl,
  iconSize: [30, 30]
});

export default class GroupSittingMarker extends React.Component<IProps> {
  markerRef: React.RefObject<Marker>;

  constructor(props: IProps) {
    super(props);
    this.markerRef = React.createRef();
  }

  getLeafletElement = () =>
    this.markerRef.current!.leafletElement as Leaflet.Marker<any> & {
      _icon: any;
    };

  getDataTestIconId = () =>
    `group-sitting-icon-${this.props.groupSitting.name
      .toLowerCase()
      .replace(" ", "-")}`;

  getDataTestPopupId = () =>
    `group-sitting-popup-${this.props.groupSitting.name
      .toLowerCase()
      .replace(" ", "-")}`;

  componentDidMount() {
    this.getLeafletElement()._icon.setAttribute(
      "data-test",

      this.getDataTestIconId()
    );
  }

  render() {
    const { groupSitting } = this.props;

    return (
      <Marker
        ref={this.markerRef}
        icon={icon}
        position={{
          lat: groupSitting.position_lat,
          lng: groupSitting.position_lng
        }}
      >
        <Popup>
          <div data-test={this.getDataTestPopupId()}>
            <h3>Group Sitting</h3>Host: {groupSitting.name}
            <p>{groupSitting.address} (contact host for full address)</p>
            <p>{groupSitting.time}</p>
            <p>
              {groupSitting.email}
              {groupSitting.email && <br />}
              {groupSitting.phone_number}
            </p>
          </div>
        </Popup>
      </Marker>
    );
  }
}
