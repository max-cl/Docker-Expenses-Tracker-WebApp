import tinycolor from 'tinycolor2';
import { ThemeOptions } from '@material-ui/core';

const primary = '#08e5b9';
const secondary = '#2e3346';
const warning = '#FFC260';
const success = '#3CD4A0';
const info = '#9013FE';

const lightenRate = 7.5;
const darkenRate = 15;

const primaryText = '#FFFFFF';
const secondaryText = secondary;

const hintText = '#B9B9B9';
const disabledText = '#9E9E9E';

const bgDefault = '#24282F';
const glassColor = 'linear-gradient(to right bottom, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.3))';

const inputBgColor = '#f2f2f2';

const defaultTheme: ThemeOptions = {
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
            contrastText: '#FFFFFF',
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
            paper: glassColor,
        },
    },

    overrides: {
        MuiButton: {
            root: {
                color: secondary,
                backgroundColor: primary,
                fontWeight: 800,
                borderRadius: 0,
            },
        },
        MuiInputBase: {
            input: {
                color: secondaryText,
                backgroundColor: inputBgColor,
                borderRadius: 0,
                fontSize: '1em',
                inputMultiline: {
                    '&:hover': {
                        backgroundColor: inputBgColor,
                    },
                    '&:focus': {
                        backgroundColor: inputBgColor,
                    },
                    '&:selected': {
                        backgroundColor: inputBgColor,
                    },
                },
            },
        },
        MuiFilledInput: {
            root: {
                borderRadius: 0,
                backgroundColor: inputBgColor,
                '&.Mui-focused': {
                    backgroundColor: inputBgColor,
                },
                '&:hover': {
                    backgroundColor: inputBgColor,
                },
            },
            adornedEnd: {
                paddingRight: 0,
                '&:hover': {
                    backgroundColor: inputBgColor,
                },
                '&:focus': {
                    backgroundColor: inputBgColor,
                },
                '&:selected': {
                    backgroundColor: inputBgColor,
                },
            },
            underline: {
                '&:after': {
                    borderBottom: `2px solid ${secondary}`,
                },
            },
        },
        MuiFormLabel: {
            root: {
                color: secondaryText,
                fontSize: '1em',
                '&.Mui-focused': {
                    color: secondaryText,
                },
            },
        },
        MuiSelect: {
            root: {
                color: secondaryText,
                backgroundColor: inputBgColor,
            },
        },
        MuiListItem: {
            root: {
                color: primaryText,
                backgroundColor: `${bgDefault} !important`,
                '&:selected': {
                    color: primaryText,
                    backgroundColor: `${bgDefault} !important`,
                },
            },
        },
        MuiMenuItem: {
            root: {
                color: primaryText,
                backgroundColor: bgDefault,
                '&:focus': {
                    color: primaryText,
                    backgroundColor: `${secondary} !important`,
                },
                '&:hover': {
                    color: primaryText,
                    backgroundColor: `${secondary} !important`,
                },
                '&:selected': {
                    color: primaryText,
                    backgroundColor: bgDefault,
                },
            },
        },
        MuiListItemIcon: {
            root: {
                color: '#FFFFFF',
            },
        },
        MuiTableCell: {
            head: {
                fontWeight: 600,
                backgroundColor: `${bgDefault} !important`,
            },
            body: {
                backgroundColor: '#fefefe',
                color: `${secondary} !important`,
            },
        },
        /** Start DatePciker */
        MuiPickersToolbar: {
            toolbar: {},
        },
        MuiPickersCalendarHeader: {
            switchHeader: {
                color: 'white',
            },
            iconButton: {
                backgroundColor: 'transparent',
            },
            dayLabel: {
                color: 'white',
            },
        },
        MuiPickersDay: {
            day: {
                color: 'white',
            },
            daySelected: {
                backgroundColor: primary,
            },
            dayDisabled: {
                color: 'gray',
            },
            current: {
                color: tinycolor(primary).darken(darkenRate).toHexString(),
            },
        },
        MuiPickersModal: {
            withAdditionalAction: {
                color: 'white',
            },
        },
        MuiPickersCalendar: {},
        MuiPickersBasePicker: {
            container: {
                backgroundColor: '#24282f',
            },
        },
        /** End DatePicker */
    },
};

export default defaultTheme;
