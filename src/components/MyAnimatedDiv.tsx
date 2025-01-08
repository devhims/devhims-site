import { animated, AnimatedProps } from '@react-spring/web';
import React, { FC, HTMLAttributes } from 'react';

type AnimatedDivProps = AnimatedProps<HTMLAttributes<HTMLDivElement>> & {
  children?: React.ReactNode; // explicitly allow children
};

const MyAnimatedDiv: FC<AnimatedDivProps> = (props) => {
  // Spread all valid HTML + animated props
  return <animated.div {...props} />;
};

export default MyAnimatedDiv;
