/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import React from "react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Text, View } from "@aws-amplify/ui-react";
export default function QuestionPlaceholder(props) {
  const { overrides, ...rest } = props;
  return (
    <View
      width="673px"
      height="43px"
      position="relative"
      padding="0px 0px 0px 0px"
      {...rest}
      {...getOverrideProps(overrides, "QuestionPlaceholder")}
    >
      <View
        position="absolute"
        top="0%"
        bottom="0%"
        left="0%"
        right="0%"
        transformOrigin="top left"
        transform="rotate(0deg)"
        padding="0px 0px 0px 0px"
        backgroundColor="rgba(217,217,217,1)"
        {...getOverrideProps(overrides, "Rectangle 4")}
      ></View>
      <Text
        fontFamily="Inter"
        fontSize="22px"
        fontWeight="400"
        color="rgba(0,0,0,1)"
        lineHeight="25.78125px"
        textAlign="left"
        display="flex"
        direction="column"
        justifyContent="flex-start"
        position="absolute"
        top="18.6%"
        bottom="18.6%"
        left="3.71%"
        right="82.32%"
        transformOrigin="top left"
        transform="rotate(0deg)"
        padding="0px 0px 0px 0px"
        whiteSpace="pre-wrap"
        children="Question"
        {...getOverrideProps(overrides, "Question")}
      ></Text>
    </View>
  );
}
