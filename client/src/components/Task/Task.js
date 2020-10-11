import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Header from '../Nav/Navbar';
import axios from 'axios';
import {Modal, Button} from 'react-bootstrap'
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {FaEdit, FaWindowClose, FaCheckCircle, FaQuestion} from 'react-icons/fa'
import moment from 'moment'

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const Data = [
    {
        task:'Buy Fruits',
        status: false,
        date: '2 Mins Ago'
    },
    {
        task:'Buy Food',
        status: true,
        date: '2 Mins Ago'
    },
    {
        task:'Buy Books',
        status: true,
        date: '2 Mins Ago'
    },
    {
        task:'Clean House',
        status: false,
        date: '2 Mins Ago'
    },
    {
        task:'Buy Fruits',
        status: false,
        date: '2 Mins Ago'
    },
    {
        task:'Buy Food',
        status: true,
        date: '2 Mins Ago'
    },
    {
        task:'Buy Books',
        status: true,
        date: '2 Mins Ago'
    },
    {
        task:'Clean House',
        status: false,
        date: '2 Mins Ago'
    },

]

const Task = (props) => {
  const classes = useStyles();
  const [taskData, setTaskData] = useState([])
  const [show, setShow] = useState(false);
  const [taskName, setTaskName] = useState('')
  const [taskStatus, setTaskStatus] = useState(false)
  const [tokenData, setTokenData] = useState(localStorage.getItem('token'))

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  


  useEffect(()=>{
    var token = localStorage.getItem('token')
      console.log(localStorage.getItem('token'))
      if(!token){
          props.history.push('/login')
      }
      getTasks()
  },[])


  const getTasks = async() => {
      if(tokenData){
      await axios({
          method:'get',
          url:'/api/task/get',
          headers:{
              'x-auth-token' : tokenData.toString()
          }
      }).then(res=>{
          console.log('Success',res)
          setTaskData(res.data.tasks)
      })
    }
  }

  const createTask = async() => {
    var userToken = localStorage.getItem('token')
    await axios({
        method:'post',
        url:'/api/task',
        headers:{
            'x-auth-token' : userToken.toString()
        },
        data:{
            task:taskName,
            status:taskStatus
        }
    }).then(res=>{
        console.log('Success Created',res)
        getTasks()
        handleClose()
    })
  }

  const deleteTask = async(id) => {
    var userToken = localStorage.getItem('token')
    await axios({
        method:'delete',
        url:'/api/task/delete',
        headers:{
            'x-auth-token' : userToken.toString()
        },
        data:{
            task_id:id,
        }
    }).then(res=>{
        console.log('Success Deleted',res)
        getTasks()
    })
  }

  const updateTask = async(id) => {
    var userToken = localStorage.getItem('token')
    await axios({
        method:'put',
        url:'/api/task/update',
        headers:{
            'x-auth-token' : userToken.toString()
        },
        data:{
            task_id:id,
            status:taskStatus
        }
    }).then(res=>{
        console.log('Success Updated',res)
        getTasks()
    })
  }


  const liveModal = () => {
      return(
        <>
        <Modal show={show} onHide={handleClose} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>Create Task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <div>
                <TextField id="standard-basic" label="Enter Task Name" onChange={(e)=>setTaskName(e.target.value)}/>
              </div>
              <div className="row" style={{marginLeft:5}}>
                <FormControlLabel
                    control={<Checkbox checked={taskStatus} onChange={()=>setTaskStatus(!taskStatus)} />}
                    label="Task Status"
                />
              </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={()=>createTask()}>
              Create Task
            </Button>
          </Modal.Footer>
        </Modal>
      </>
      )
  }
  return (
    <>
        <Header history={props.history}/>
        <div style={{display:'flex', justifyContent:'center', marginTop:10, marginBottom:20}}>
            <FaEdit onClick={handleShow} style={{height:40, width:40, cursor:'pointer'}}/>
        </div>
{/*         
        <Button onClick={handleShow}>Modal</Button> */}
        <div className="row">
            {
                taskData.map(val=>(
                    <div className="col-lg-3">
                    <Card variant="outlined" style={{width:'70', marginLeft:5, marginRight:5, marginTop:10}}>
                    <CardContent>
                        <div style={{display:'flex', justifyContent:'space-between'}}>
                            <p style={{fontWeight:'bold'}}>{val.task}</p>
                            <input type="checkbox" value={val.status} checked={val.status} onChange={()=>setTaskStatus(!taskStatus)}/>
                        </div>
                    </CardContent>
                    <CardContent>
                        <div style={{display:'flex', justifyContent:'space-between'}}>
                            {
                                val.status === true ? (
                                    <FaQuestion onClick={()=>updateTask(val._id)} style={{color:'yellow', height:20, width:20, cursor:'pointer'}}/>
                                ):
                                (
                                    <FaCheckCircle onClick={()=>updateTask(val._id)} style={{color:'green', height:20, width:20, cursor:'pointer'}}/>
                                )
                            }
                            <FaWindowClose onClick={()=>deleteTask(val._id)} style={{color:'red', height:20, width:20, cursor:'pointer'}}/>
                        </div>
                    </CardContent>
                    <CardActions>
                        <div style={{position:'absolute', right:30}}>
                            <p>{moment(val.date).calendar()}</p>
                        </div>
                    </CardActions>
                    </Card>
                    </div>
                ))
            }
        </div>
        {liveModal()}
    </>
    
  );
}

export default Task
