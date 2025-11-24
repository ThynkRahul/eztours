"use client";

import React from "react";
import packageData from "../data/en/packages.json";
import VerticalTimeline from "./VerticalTimeline";

interface IPackageDetailProp {
  packageUri?: string;
}

export default function PackageDetail({ packageUri }: IPackageDetailProp) {
  const tourPackage = packageData.filter(function (tourPackage) {
    return tourPackage.Uri == packageUri;
  })[0];

  return (
    <>
      <div className="">
        <VerticalTimeline tourPackage={tourPackage}></VerticalTimeline>
      </div>
    </>
  );
}