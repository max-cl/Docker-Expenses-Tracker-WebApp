import tinycolor from "tinycolor2";

const primary = "#536DFE";
const secondary = "#FF5C93";
const warning = "#FFC260";
const success = "#3CD4A0";
const info = "#9013FE";

const lightenRate = 7.5;
const darkenRate = 15;

const primaryText = "#4A4A4A";
const secondaryText = "#6E6E6E";
const hintText = "#B9B9B9";
const disabledText = "#9E9E9E";

const bgDefault = "#F6F7FF";
const bgLight = "#F3F5FF";

const defaultTheme = {
    palette: {
        primary: {
            main: primary,
            light: tinycolor(primary).lighten(lightenRate).toHexString(),
            dark: tinycolor(primary).darken(darkenRate).toHexString(),
        },
        secondary: {
            main: secondary,
            light: tinycolor(secondary).lighten(lightenRate).toHexString(),
            dark: tinycolor(secondary).darken(darkenRate).toHexString(),
            contrastText: "#FFFFFF",
        },
        warning: {
            main: warning,
            light: tinycolor(warning).lighten(lightenRate).toHexString(),
            dark: tinycolor(warning).darken(darkenRate).toHexString(),
        },
        success: {
            main: success,
            light: tinycolor(success).lighten(lightenRate).toHexString(),
            dark: tinycolor(success).darken(darkenRate).toHexString(),
        },
        info: {
            main: info,
            light: tinycolor(info).lighten(lightenRate).toHexString(),
            dark: tinycolor(info).darken(darkenRate).toHexString(),
        },
        text: {
            primary: primaryText,
            secondary: secondaryText,
            hint: hintText,
            disabled: disabledText,
        },
        background: {
            default: bgDefault,
            light: bgLight,
        },
    },
    shadows: ["0 5px 5px rgba(0,0,0,.6)"],
    overrides: {
        MuiInputBase: {
            input: {
                color: primaryText,
            },
        },
        MuiFormLabel: {
            root: {
                color: secondaryText,
            },
        },
        MuiSelect: {
            root: {
                color: primaryText,
            },
        },
        MuiMenuItem: {
            root: {
                color: primaryText,
                "&:focus": {
                    color: primary,
                },
                "&:hover": {
                    color: primary,
                },
                "&:selected": {
                    color: primary,
                },
            },
        },
        // MuiSvgIcon: {
        //     root: {
        //         color: tinycolor(primary).lighten(lightenRate).toHexString(),
        //     },
        // },
        /** Start DatePciker */
        MuiPickersToolbar: {
            toolbar: {},
        },
        MuiPickersCalendarHeader: {
            switchHeader: {
                color: "white",
            },
            iconButton: {
                backgroundColor: "transparent",
            },
            dayLabel: {
                color: "white",
            },
        },
        MuiPickersDay: {
            day: {
                color: "white",
            },
            daySelected: {
                backgroundColor: primary,
            },
            dayDisabled: {
                color: "gray",
            },
            current: {
                color: tinycolor(primary).darken(darkenRate).toHexString(),
            },
        },
        MuiPickersModal: {
            dialogAction: {
                color: "white",
            },
        },
        MuiPickersCalendar: {},
        MuiPickersBasePicker: {
            container: {
                backgroundColor: "#24282f",
            },
        },
        /** End DatePicker */
    },
};

export default defaultTheme;
