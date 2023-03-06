import React from "react";
import type { AddressValue } from "../../utils/Types";
import classes from "../../sassStyles/componentStyles/SingleAddress.module.scss";

type Props = {
  address: AddressValue;
};

const SingleAddress: React.FC<Props> = ({ address }) => {
  return (
    <div className={classes.singleAddress}>
      <h1>
        {address.name} {address.surname}
      </h1>
      <p>{address.phone}</p>
      <p>
        {address.city} {address.district}
      </p>
      <p>
        {address.address} no:{address.doorNumber}
      </p>
    </div>
  );
};

export default SingleAddress;
