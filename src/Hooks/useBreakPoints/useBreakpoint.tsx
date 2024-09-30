import { useMediaQuery } from "react-responsive";

type Media = "min" | "max";

interface Breakpoints {
  [prop: string]: boolean;
}

const mediaQuery = useMediaQuery;

interface BreakpointsValues {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
}
export const useBreakpoints = (media: Media = "max"): Breakpoints => {
  const breakpoints = {
    xs: "359px",
    sm: "767px",
    md: "1023px",
    lg: "1279px",
    xl: "1500px",
  };

  return Object.keys(breakpoints).reduce((acc, act) => {
    return {
      ...acc,
      [act]: mediaQuery({
        query: `(${media}-width: ${breakpoints[act as keyof BreakpointsValues]})`,
      }),
    };
  }, {});
};

export default useBreakpoints;
