import { MenuItem, Paper, Typography } from "@mui/material";
import { useTheme } from "@mui/material";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { Grid } from "@mui/material";
import { AddUserFormInputs, Status } from "../../constants";
import FormActionButtons from "../FormActionButtons";
import { TextValidatorStyle, TypographyStyles } from "../../Utils/Constants";
import AddUserFormLogics from "../../Utils/AddUserFormLogics";

const AddUserFormCom = () => {
  const { UserHandleChange, userValues, userHandleSubmit, handleClear } =
    AddUserFormLogics();

  const theme = useTheme();

  return (
    <Paper
      elevation={3}
      style={{
        position: "relative",
        width: "650px",
        borderRadius: "12px",
        margin: "4rem",
      }}
    >
      <ValidatorForm
        onSubmit={userHandleSubmit}
        onError={(errors: any) => console.log(errors)}
      >
        <Grid
          container
          spacing={2}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "12px",
              height: "54px",
            },
            "& .MuiTextValidator-root": {
              width: "30ch",
            },
            padding: "2rem 2rem 2rem 3rem",
          }}
        >
          {AddUserFormInputs.map((inputs) => (
            <Grid item xs={6}>
              <Typography style={TypographyStyles}>{inputs.label}</Typography>
              <TextValidator
                placeholder={inputs.placeholder}
                id="outlined-basic"
                variant="outlined"
                value={userValues[inputs.name]}
                onChange={UserHandleChange}
                name={inputs.name}
                required={inputs.required}
                style={{
                  width: "250px",
                  marginTop: "0.5rem",
                }}
                sx={TextValidatorStyle}
              />
            </Grid>
          ))}
          <Grid item xs={6}>
            <Typography style={TypographyStyles}>Status</Typography>
            <TextValidator
              name="Status"
              value={userValues.Status}
              onChange={UserHandleChange}
              variant="outlined"
              sx={TextValidatorStyle}
              style={{ marginTop: "5px", width: "250px" }}
              id="outlined-select-type"
              required={true}
              select
              defaultValue="Select"
            >
              {Status.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextValidator>
          </Grid>
        </Grid>
        <Grid item xs={3} sx={{ m: "0 0 2rem 3rem" }}>
          <FormActionButtons handleClear={handleClear} />
        </Grid>
      </ValidatorForm>
    </Paper>
  );
};

export default AddUserFormCom;
