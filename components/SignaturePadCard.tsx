import React from "react";
import { Button, Card } from "antd";
import SignaturePad from "react-signature-pad-wrapper";
import { ClearOutlined } from "@ant-design/icons";
import { useState } from "react";
import styled from "styled-components";
import { useRef } from "react";
import { useEffect } from "react";

type TSignaturePad = {
  dotSize?: number;
  minWidth?: number;
  maxWidth?: number;
  throttle?: number;
  minDistance?: number;
  backgroundColor?: string;
  penColor?: string;
  velocityFilterWeight?: number;
  onBegin?: () => void;
  onEnd?: () => void;
};

export interface ISignaturePad {
  isEmpty: () => boolean;
  clear: () => void;
  fromData: (data: Pick<ImageData, "data">) => void;
  fromDataURL: (base64: string) => void;
  toData: () => Pick<ImageData, "data">;
  toDataURL: (mime?: string) => string;
  off: () => void;
  on: () => void;
  handleResize: () => void;
  scaleCanvas: () => void;
}

interface ISignaturePadCard {
  ref: React.MutableRefObject<ISignaturePad>;
  options?: TSignaturePad;
  width?: number;
  height?: number;
  onDraw?: (base64Image: string) => void;
  onClear?: () => void;
  disabled?: boolean;
  defaultData?: string;
}

const SignaturePadCard = (props: Omit<ISignaturePadCard, "ref">): React.ReactElement => {
  const [firtsRenderDefaultData, setIsFirtsRenderDefaultData] = useState(true);
  const [isSignPadEmpty, setIsSignPadEmpty] = useState(true);
  const signPadRef = useRef<ISignaturePad>();

  const handleOnEnd = (): void => {
    setIsSignPadEmpty(signPadRef.current.isEmpty());
    props?.options?.onEnd();
    props?.onDraw(signPadRef.current.toDataURL());
  };

  const handleOnClear = (): void => {
    signPadRef.current.clear();
    setIsSignPadEmpty(true);
    props?.onClear();
  };

  useEffect(() => {
    props?.disabled ? signPadRef.current.off() : signPadRef.current.on();
  }, [props?.disabled]);

  useEffect(() => {
    if (props.defaultData && firtsRenderDefaultData) {
      signPadRef.current.fromDataURL(props.defaultData);
      setIsSignPadEmpty(false);
      setIsFirtsRenderDefaultData(false);
    }
  }, [props?.defaultData]);

  return (
    <StyledSignCard width={`${props.width || 300}px`} height={`${props.height || 150}px`}>
      <SignaturePad
        options={{
          ...props.options,
          onEnd: () => handleOnEnd(),
        }}
        ref={signPadRef}
      />
      <StyledFloatinButton
        type="primary"
        shape="circle"
        disabled={props?.disabled || isSignPadEmpty}
        icon={<ClearOutlined />}
        onClick={handleOnClear}
      />
    </StyledSignCard>
  );
};

export default SignaturePadCard;

const StyledSignCard = styled(Card)<{ width?: number | string; height?: number | string }>`
  ${({ width, height }) => `
    width: ${width};
    height: ${height};
    position: relative;

    .ant-card-body {
      padding: 0;
    }
    `}
`;

const StyledFloatinButton = styled(Button)`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translate(50%, -50%);
`;
