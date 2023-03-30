import { Box, Card, CardContent, CardHeader, Grid,styled, Typography } from "@mui/material";
import "./Landing.css";
import { Link } from "react-router-dom";
import AddPhotoAlternateTwoToneIcon from '@mui/icons-material/AddPhotoAlternateTwoTone';
import PeopleAltTwoToneIcon from '@mui/icons-material/PeopleAltTwoTone';

const Item = styled(Card)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    width: "100%",
    color: theme.palette.text.secondary,
    height: "10rem",
  }));
function FamilyLanding(props: any){
    return (
        <div id="landing">
            
            <Card id="card" sx={{boxShadow: 3}}>
                <CardContent>
                    <Typography variant="h4">Available actions:</Typography>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={4} id="gridItem">
                                <Link to={"/uploadMedia"}>
                                    <Item id="actionItem">
                                        <Typography variant="subtitle1">Upload Media</Typography>
                                        <AddPhotoAlternateTwoToneIcon id="icon"/>
                                    </Item>                                    
                                </Link>
                            </Grid>
                            <Grid item xs={4}>
                                    <Link to={"/familyForm"}>
                                        <Item  id="actionItem">
                                            <Typography variant="subtitle1">About the patient form</Typography>
                                            <PeopleAltTwoToneIcon id="icon"/>
                                        </Item>
                                    </Link>
                            </Grid>
                        </Grid>
                    </Box>                   
                </CardContent>
            </Card>
 
        </div>
    )
}
export default FamilyLanding;