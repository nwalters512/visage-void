import React, { useContext, CSSProperties } from "react";
import {
  Slider,
  Button,
  ButtonGroup,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Context from "../../context";
import symbol from "../../symbol";
import { COVER_TYPE } from "../../const";
import { CoverType, ColorSetting } from "../../types";
import { Paper } from "../atom/Paper";
import { Label, SubTitle } from "../atom/Text";

const styles: {
  sliderContainer: CSSProperties;
  buttonContainer: CSSProperties;
  colorSliderContianer: CSSProperties;
  colorSetting: CSSProperties;
  colorLabelContainer: CSSProperties;
} = {
  sliderContainer: {
    margin: 10,
  },
  buttonContainer: {
    margin: 10,
  },
  colorSliderContianer: {
    display: "flex",
    minWidth: 200,
    flexDirection: "row",
  },
  colorSetting: {
    display: "flex",
    flexDirection: "column",
  },
  colorLabelContainer: {
    marginRight: 12,
  },
};

const Setting = () => {
  const { context, setContext } = useContext(Context);
  const {
    heightMultiplier,
    widthMultiplier,
    type: currentType,
    color,
  } = context.setting;
  const setHeightMultipler = (heightMultiplier: number) => {
    setContext({
      ...context,
      setting: { ...context.setting, heightMultiplier },
    });
  };
  const setWidthMutiplier = (widthMultiplier: number) => {
    setContext({
      ...context,
      setting: { ...context.setting, widthMultiplier },
    });
  };
  const setType = (type: CoverType) => {
    setContext({
      ...context,
      setting: { ...context.setting, type },
    });
  };
  const setColor = (color: ColorSetting) => {
    setContext({
      ...context,
      setting: {
        ...context.setting,
        color: { ...context.setting.color, ...color },
      },
    });
  };

  const sliders = [
    {
      text: "HEIGHT MULTIPLIER",
      value: heightMultiplier,
      setter: setHeightMultipler,
    },
    {
      text: "WIDTH MULTIPLIER",
      value: widthMultiplier,
      setter: setWidthMutiplier,
    },
  ];

  const colorSliders = [
    {
      text: "R",
      value: color.red,
      setter: (red) => setColor({ ...color, red }),
    },
    {
      text: "G",
      value: color.green,
      setter: (green) => setColor({ ...color, green }),
    },
    {
      text: "B",
      value: color.blue,
      setter: (blue) => setColor({ ...color, blue }),
    },
  ];

  return (
    <Paper>
      <SubTitle>SETTINGS</SubTitle>
      <div style={styles.buttonContainer}>
        <Label>COVER TYPE</Label>
        <ButtonGroup color="primary" aria-label="outlined primary button group">
          {COVER_TYPE.map((type) => {
            return (
              <Button
                key={type}
                variant={type === currentType ? "contained" : "outlined"}
                onClick={() => setType(type)}
              >
                {type}
              </Button>
            );
          })}
        </ButtonGroup>
      </div>
      {sliders.map(({ text, value, setter }) => {
        return (
          <div style={styles.sliderContainer} key={text}>
            <Label>{text}</Label>
            <Slider
              value={value}
              onChange={(_, newValue) => {
                setter(Array.isArray(newValue) ? newValue[0] : newValue);
              }}
              aria-labelledby="continuous-slider"
              valueLabelFormat={(value) => {
                return `${value}%`;
              }}
              min={50}
              max={200}
              valueLabelDisplay="auto"
            />
          </div>
        );
      })}
      <ExpansionPanel style={symbol.STYLE.contentWrapper}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <div
            style={{
              backgroundColor: `rgb(${color.red},${color.green},${color.blue})`,
              borderRadius: 80,
              width: 24,
              height: 24,
              marginRight: 12,
            }}
          />
          <Label>CHANGE COLOR</Label>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div style={styles.colorSetting}>
            {colorSliders.map((props) => {
              const { text, value, setter } = props;
              return (
                <div style={styles.colorSliderContianer} key={text}>
                  <div style={styles.colorLabelContainer}>
                    <Label>{text}</Label>
                  </div>
                  <Slider
                    value={value}
                    onChange={(_, newValue) => {
                      setter(Array.isArray(newValue) ? newValue[0] : newValue);
                    }}
                    aria-labelledby="continuous-slider"
                    min={0}
                    max={255}
                    valueLabelDisplay="auto"
                  />
                </div>
              );
            })}
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </Paper>
  );
};

export default Setting;
