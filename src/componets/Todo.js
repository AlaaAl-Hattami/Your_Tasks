
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useContext , useState } from 'react';
import { TodosContext } from '../Contextes/TodosContext';
import { useToast } from '../Contextes/ToastContext';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

export default function Todo({Todo, showDelete , showUpdate  }){

  const {todos, settodos} = useContext(TodosContext)
  const {showmessage}= useToast()

      function handlchechedclick(){
  const statetask = todos.map((t)=>{
    if(t.id == Todo.id){
      t.iscompleted = !t.iscompleted; 
    }
return t
  })
  settodos(statetask)
  localStorage.setItem("todos", JSON.stringify(statetask))
   
 showmessage("تم اضافتها في قائمه المنجزه")
  
   }

    function handleDelste(){
      showDelete(Todo)
    }
   
    function handleupdateedite(){
      showUpdate(Todo);
    }

  
  
    return(
        <>
  
  
    <Card
        className="cardcon" 
        sx={{ minWidth: 275, background: Todo.iscompleted ? "green" : " black", color:"white", marginTop:5 }}>
      <CardContent>
      <Grid container spacing={2} sx={{ marginTop:"5px" }}>
          
        <Grid  xs={7}   >
        <Typography variant="h5" sx={{ textAlign: "right", fontFamily:"inherit", color:"lightsalmon", textDecoration: Todo.iscompleted ? "line-through" : "none"}}> {Todo.title} </Typography>
        <Typography variant="h6" sx={{ textAlign: "right", fontFamily:"inherit" ,  textDecoration: Todo.iscompleted ? "line-through" : "none"}}>  {Todo.detailes} </Typography>
        </Grid>
        <Grid  xs={4}  style={{ }}
        display="flex" justifyContent="space-around"  alignItems="cenetr"
        >
        <IconButton 
        onClick={()=>{
          handlchechedclick();
        }}
        className="icon-btn"
        style={{  height:"50px", width:"50px", background:"white", color:"green", border:"solid green 1px" }}
          >
        <CheckIcon />
      </IconButton>
      <IconButton 
       className="icon-btn"
        aria-label="edite"
        onClick={handleupdateedite}
        style={{  height:"50px", width:"50px", background: "white", color:"blue", border:"solid blue 2px" }}
        >
        <EditIcon />
      </IconButton> 
      <IconButton 
       className="icon-btn"
        aria-label="delete"
        style={{ background:"white", height:"50px", width:"50px",  color:"rgba(169, 6, 6, 0.96)", border:"solid rgba(169, 6, 6, 0.96) 2px" }}

        onClick={()=>{
          handleDelste()
        }}
        >
        <DeleteOutlineOutlinedIcon  />
      </IconButton>
        </Grid>
      </Grid>

      </CardContent>
    </Card>
        </>
    )
    }
