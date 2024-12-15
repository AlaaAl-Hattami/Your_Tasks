
import * as React from 'react';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Todo from './Todo';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { v4 as uuidv4 } from 'uuid';
import { TodosContext } from '../Contextes/TodosContext';
import { useToast } from '../Contextes/ToastContext';
import { useContext , useState , useEffect , useMemo } from 'react';
  
export default function Todolist() {
  const {todos , settodos} = useContext(TodosContext);
  const {showmessage}= useToast()

  const [showDelete , setdelete]=useState(false)
  const [dialogtodo, setdilogtodo]=useState({title: Todolist.title, detailes:Todolist.detailes})
  const[titleinput,settileinput]=useState("");
  const [displayTodo, setdisplayTodo]=useState("all ")

  const [EditeTodo, setediteTodo]=useState(false)


  const truecompleted= useMemo(()=>{
   return todos.filter((e)=>{
      return e.iscompleted
    })
  }, [todos])
  
 const noncompleted =useMemo(()=>{
  return todos.filter((e)=>{
    return !e.iscompleted
  })
 },[todos])
 
  let berender =todos
  if (displayTodo =="completed"){
    berender = truecompleted
  } else if(displayTodo == "non-completed"){
    berender =noncompleted
  } 
  function swappages(t){
    setdisplayTodo(t.target.value)
  }


 
 
  
  useEffect(()=>{
const effexctm = JSON.parse(localStorage.getItem("todos")) ?? [] ;
    settodos(effexctm)
  },[])
 function hnadleclick(){
   const newarr={
    id:uuidv4(),
    title:titleinput,
    detailes:"",
    iscompleted:false
   }
   const newupdate=[...todos,newarr]
   localStorage.setItem("todos", JSON.stringify(newupdate))
   settodos(newupdate)
   settileinput("");
   showmessage("تمت اضافه المهمه بنجاح");
}
  function openshowDelete(todo){
    setdilogtodo(todo)
    setdelete(true)
  }
function handlDeleteeclosed(){
  setdelete(false)
}

function openUpdateDiloag(todo){
  setdilogtodo(todo)
  setediteTodo(true)

}

function handleClose(){
  setediteTodo(false)
 }
 function UPdateconirm(){
const update=todos.map((t)=>{
  if(t.id == dialogtodo.id){
    return {...t , title: dialogtodo.title, detailes: dialogtodo.detailes}
  }
  else {
    return t
  }
        })
      settodos(update)
      setediteTodo(false)
  localStorage.setItem("todos",JSON.stringify(update));
  showmessage( "تم تعديل المهمه بنجاح ✔");

} 


 function delettask()
    {
    const deleteds = todos.filter((t)=>{
   return t.id != dialogtodo.id
    })

    settodos(deleteds);
    localStorage.setItem("todos", JSON.stringify(deleteds))
    setdelete(false)
    showmessage("تم حذف المهمه بنجاح ✔");


  }
  const arr=berender.map((t)=>{
    return<Todo key={t.id} Todo={t} showDelete={openshowDelete} showUpdate={openUpdateDiloag} />
})
  return (
  <>  
   <Dialog sx={{ direction:'rtl' }}
        open={EditeTodo}
        onClose={handleClose}
        
      >
        <DialogTitle style={{ fontSize:"30px" }}>تعديل المهمة</DialogTitle>
        <DialogContent>
        
          <TextField
            autoFocus
            required
            margin="dense"
           
            label=" عنوان المهمه"
            fullWidth
            variant="standard"
            value={dialogtodo.title}
            onChange={(e)=>{
              setdilogtodo({
                ...dialogtodo,
                title: e.target.value
              })
            }}
          />
           <TextField
            autoFocus
            required
            label=" التفاصيل"
            fullWidth
            variant="standard"
            value={dialogtodo.detailes}
            onChange={(e)=>{
              setdilogtodo({
                ...dialogtodo,
                detailes: e.target.value
              })
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>الغاء</Button>
          <Button type="submit" onClick={UPdateconirm}>تعديل</Button>
        </DialogActions>
      </Dialog>


   <Dialog
  style={{ direction:"rtl"}}
        open={showDelete}
        onClose={handlDeleteeclosed}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
هل انت متاكد من حذف هذه المهه؟
        </DialogTitle>       
          <DialogContentText  style={{ marginRight:"25px" }} id="alert-dialog-description">
 لايمكنك التراجع عن الحذف بعد اتمامه

          </DialogContentText>
                    
              <DialogActions>
          <Button 
          onClick={delettask}
          style={{ background:"red", fontSize:"17px", color:"white", border:"2px soiled white"}}>حذف</Button>
          <Button  autoFocus
          onClick={handlDeleteeclosed}>
      رجوع
          </Button>
        </DialogActions>
      </Dialog>
      
      <Container maxWidth="sm"  
      >
  <Card sx={{ minWidth: 275 }}
    style={{ maxHeight:"80vh", overflow:"scroll" }}>
      <CardContent>
        <Typography style={{ color:"black"  }} variant="h2">
            قائمه المهام
           </Typography>
          <Divider  />
          <Typography style={{ color:"gray" , marginTop:"10px"}} variant="h5">
                      ادخل الماده التي تريد اضافتها وجعلها من ضمن اهدافك لاتمامها وجعلها من ضمن المنجزات    
           </Typography>
          <ToggleButtonGroup
          style={{ direction:"ltr", marginTop:"30px"  }}
      exclusive
      value={displayTodo}
      onChange={swappages}
      aria-label="text alignment"
      color="primary"
    >
    
    
      <ToggleButton value="non-completed" style={{ fontWeight:"bolder", fontSize:"20px", background:"rgb(240, 220, 220)" }}>
       غير المنجز
      </ToggleButton>
      <ToggleButton value="completed" style={{ fontWeight:"bolder", fontSize:"20px" }}>
           المنجز
       </ToggleButton>
      <ToggleButton value="all" style={{ fontWeight:"bolder", fontSize:"20px" }} >
          الكل
      </ToggleButton>
    </ToggleButtonGroup>
    {
      arr
    }

    <Grid container spacing={2}  style={{ marginTop:"20px" }}>
        <Grid xs={8}
         display="flex" justifyContent="space-around"  alignItems="center"
       >
      <TextField  
      value={titleinput}
        onChange={(e) =>{
          settileinput(e.target.value)
        }}
      style={{ width:"100%"}} id="outlined-basic" label="عنوان المهمه" variant="outlined" />

        </Grid>

        <Grid xs={4} 
                 display="flex" justifyContent="space-around"  alignItems="center"
               
>
  <Button 
  onClick={()=>{
  hnadleclick();

}}
disabled={titleinput.length == 0}
style={{ background:"darkcyan",color:"white", width:"80%", height:"100%", fontSize:"20px",fontWeight:"bold", fontStyle:"initial"}} >اضافه مهمة</Button>

</Grid>
    </Grid>
      </CardContent>
     
    </Card>

          </Container>
          </>

  
  );
}