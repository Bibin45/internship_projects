import React,{useState,useEffect,useContext} from "react"
import axios from "axios";
import {Link,useNavigate} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import {setIslog,setLoguser} from '../redux/slice/User'
import Header from "../components/Header";
import Footer from "../components/Footer";

function Form(){
  const islog=useSelector((state) => state.user.islog)
  const user=useSelector((state) => state.user.user)

  let log=localStorage.getItem('mylog')
  let name=localStorage.getItem('name')
  
const navigate=useNavigate()
    useEffect(()=>{
            if(islog||log==='true') navigate('/form')
        },
        [islog]
    )
    
  
  
// main state
  const[form,setForm]=useState({
      
    name:'',
    email:'',
    phone:'',
    role:'',
    objective:'',
    skill:[],
    education:[],
    certification:[],
    project:[],
    experience:[],
    hobby:[],
    interest:[],
    language:[],
    father_name:'',
    mother_name:'',
    sibling_name:'',
    age:'',
    blood_group:'',
    gender:'',
    maritial_status:'',
    address:''
    
  
  })
     


  // storing name and personal details

  
      const Change=async(key,value)=>{
        let update='';
        update={...form,[key]:value}
        setForm(update)
  
        
      }
      
        //temporary state 

        const[update,setUpdate]=useState({
          study:'',
          year:'',
          institute:'',
          percentage:'',
          course:'',
          tution:'',
          duration:'',
          title:'',
          abstract:'',
          company:'',
          exp:'',
          role:'',
          skill:[],
          hobby:[],
          interest:[],
          language:[],
          
        })

    
//create resume 
let Create_resume={
  request:'create_react_resume',
  user:`${name}`,
  resume:form}

    const Create=async()=>{
      
      let data = await axios.post('http://karka.academy/api/action.php',JSON.stringify(Create_resume))
      
      // console.log(data)
}
   //get resume
   
    const[getresume,setGetresume]=useState()
    let Get=async()=>{
      let {data}=await axios.get(`http://karka.academy/api/action.php?request=get_user_react_resume&user=${name}`)
      let req=data.data
      setGetresume(req)
    }
  // console.log(getresume)
   

    useEffect(()=>{
      Get();
      Deleteresume();
      
    })
  
// delete resume


let Deleteresume=async(id)=>{
  let {data}=await axios.get(`http://karka.academy/api/action.php?request=delete_react_user_resume&user=${name}&id=${id}`)
  
}


    
// update form details

    const Update=async(key)=>{
      if(key==='education'||key==='experience'||key==='project'||key==='certification'){
        let eduupdate=[...form[key], update];
        setForm({...form,[key]:eduupdate})
        setUpdate({...update,study:'',year:'',institute:'',percentage:'',skill:'',hobby:'',interest:'',language:'',course:'',tution:'',duration:'',title:'',abstract:'',company:'',exp:'',role:''})
        }
        
      else{
        let eduupdate=[...form[key], update[key]];
          setForm({...form,[key]:eduupdate})
          setUpdate({...update,study:'',year:'',institute:'',percentage:'',skill:'',hobby:'',interest:'',language:'',course:'',tution:'',duration:'',title:'',abstract:'',company:'',exp:'',role:''})
        }
    }

//Delete Form Details
  
  const Delete=async(key,index)=>{
    
    let newdel=form[key].filter((item,i)=>i!==index)
    setForm({...form,[key]:newdel})
    }
  
  // console.log(form)

// console.log(name)
  
    return(
        <>
        <Header />
        <div className='container font mt-3  text-secondary'>
            <h2 className="text-center">Welcome {user.name} </h2>
            <div className="row mt-3 mb-3">
              <h5 className="col-2 mt-2 ">Name : </h5>
              <input className='form-control col ' onChange={(e)=>Change('name',e.target.value)} placeholder="Enter Your Name"/>
            </div>
            <div className="row mt-3 mb-3">
              <h5 className="col-2 mt-2 ">Email : </h5>
              <input className='form-control col ' onChange={(e)=>Change('email',e.target.value)}  placeholder="Enter Your Email"/>
            </div>
            <div className="row mt-3 mb-3">
              <h5 className="col-2 mt-2 ">Phone : </h5>
              <input className='form-control col ' onChange={(e)=>Change('phone',e.target.value)}  placeholder="Enter Your Phone Number"/>
            </div>
            <div className="row mt-3 mb-3">
              <h5 className="col-2 mt-2 ">Role : </h5>
              <input className='form-control col ' onChange={(e)=>Change('role',e.target.value)}  placeholder="Enter Your Role"/>
            </div>
            <div className="row mt-3 mb-3">
              <h5 className="col-2 mt-2 ">Objective : </h5>
              <input className='form-control col 'onChange={(e)=>Change('objective',e.target.value)}  placeholder="Enter Your Career Objective"/>
            </div>
            <div className="row mt-3 mb-3">
              <h5 className="col-2 mt-2 ">Skills : </h5>
              <input className='form-control col ' value={update.skill} onChange={(e)=>setUpdate({...update,skill:e.target.value})} placeholder="Skills"/>
              <button onClick={()=>Update('skill')} className="btn btn-outline-primary  col-sm-1">+</button>
              <div className="font mt-3">
                {form.skill.map((item,index)=><div key={index} className='row'><li className='col-11'>{item}   </li><button className="btn font btn-sm  btn-outline-danger col" onClick={()=>Delete('skill',index)} >-</button></div>)}
                
              </div>
            </div>

        

        <h3 className="text-center mt-5 mb-5 font">Education : </h3>
          <table className="table text-center border font">
              <thead >
                <tr className="font text-secondary ">
                  <th>Course</th>
                  <th >Year</th>
                  <th >Institute</th>
                  <th >Percentage</th>
                  <th>Add</th>
                </tr>
                
              </thead>
              <tbody>
                <tr>
                  <td><input value={update.study} onChange={(e)=>setUpdate({...update,study:e.target.value})} type="text" className="form-control" /></td>
                  <td><input value={update.year} onChange={(e)=>setUpdate({...update,year:e.target.value})} type="number"  className="form-control" /></td>
                  <td><input value={update.institute} onChange={(e)=>setUpdate({...update,institute:e.target.value})} type="text" className="form-control"  /></td>
                  <td><input value={update.percentage} onChange={(e)=>setUpdate({...update,percentage:e.target.value})}type="number"  className="form-control"/></td>
                  <td><button onClick={()=>Update('education')} className="btn btn-outline-primary  col">+</button></td>
                </tr>
                
                
              </tbody>
              
            </table>
            <div className="font mt-3">
                {form.education.map((item,index)=>
                  <div key={index}>
                    <table className="table text-center border font"><thead >
                      </thead>
                      <tbody><tr className="font text-secondary ">
                        <td className="col-3 border">{item.study}</td>
                        <td className="col-3 border">{item.year}</td>
                        <td className="col-3 border">{item.institute}</td>
                        <td className="col-3 border">{item.percentage}</td>
                        <td className="col"><button onClick={()=>Delete('education',index)} className="btn btn-outline-danger ">-</button></td></tr></tbody>
                    </table>
                  </div>
                )}
                
            </div>


            <h3 className="text-center mt-5 mb-5 font">Certification : </h3>
            <table className="table text-center border font">
              <thead >
                <tr className="font text-secondary" >
                  <th scope="col">Courses</th>
                  <th scope="col">Institute</th>
                  <th scope="col">Duration</th>
                  <th>Add</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><input type="text" value={update.course} onChange={(e)=>setUpdate({...update,course:e.target.value})} className="form-control"  /></td>
                  <td><input type="text" value={update.tution} onChange={(e)=>setUpdate({...update,tution:e.target.value})} className="form-control"  /></td>
                  <td><input type="text" value={update.duration} onChange={(e)=>setUpdate({...update,duration:e.target.value})} className="form-control" /></td>
                  <td><button onClick={()=>Update('certification')} className="btn btn-outline-primary  col">+</button></td>

                </tr>
                
              </tbody>
            </table>
            <div className="font mt-3">
                {form.certification.map((item,index)=>
                  <div key={index}>
                    <table className="table text-center border font"><thead >
                      </thead>
                      <tbody><tr className="font text-secondary ">
                        <td className="col-4 border">{item.course}</td>
                        <td className="col-4 border">{item.tution}</td>
                        <td className="col-4 border">{item.duration}</td>
                        <td className="col"><button onClick={()=>Delete('certification',index)} className="btn btn-outline-danger ">-</button></td></tr></tbody>
                    </table>
                  </div>
                )}
            </div>


      
      <h3 className="text-center mt-5 mb-5 font">Project : </h3>
            <table className="table text-center border font">
              <thead className="font">
                <tr>
                  <th scope="col">Title</th>
                  <th scope="col">Abstrsct</th>
                  <th>Add</th>
                  
                </tr>
              </thead>
              <tbody>
                <tr className="font text-secondary">
                  
                  <td><input type="text" value={update.title} onChange={(e)=>setUpdate({...update,title:e.target.value})} className="form-control"  /></td>
                  <td><input type="text" value={update.abstract} onChange={(e)=>setUpdate({...update,abstract:e.target.value})}className="form-control"  /></td>
                  <td><button onClick={()=>Update('project')} className="btn btn-outline-primary  col">+</button></td>

                </tr>
                
              </tbody>
            </table>
            <div className="font mt-3">
                {form.project.map((item,index)=>
                  <div key={index}>
                    <table className="table text-center border font"><thead >
                      </thead>
                      <tbody><tr className="font text-secondary ">
                        <td className="col-5 border">{item.title}</td>
                        <td className="col-5 border">{item.abstract}</td>
                        
                        <td className="col-1"><button onClick={()=>Delete('project',index)} className="btn btn-outline-danger ">-</button></td></tr></tbody>
                    </table>
                  </div>
                )}
                
            </div>


            <h3 className="text-center mt-5 mb-5 font">Experience : </h3>
            <table className="table text-center border font">
              <thead className="font text-secondary">
                <tr>
                  
                  <th scope="col">Company</th>
                  <th scope="col">Duration</th>
                  <th scope="col">Role</th>
                  <th>Add</th>
                  
                  
                </tr>
              </thead>
              <tbody>
                <tr>
                  
                  <td><input type="text"  value={update.company} onChange={(e)=>setUpdate({...update,company:e.target.value})}  className="form-control" /></td>
                  <td><input type="text"   value={update.exp} onChange={(e)=>setUpdate({...update,exp:e.target.value})} className="form-control"/></td>
                  <td><input type="text"  value={update.role} onChange={(e)=>setUpdate({...update,role:e.target.value})} className="form-control" /></td>
                  <td><button onClick={()=>Update('experience')} className="btn btn-outline-primary  col">+</button></td>

                </tr>
                
              </tbody>
            </table>
            <div className="font mt-3">
                {form.experience.map((item,index)=>
                  <div key={index}>
                    <table className="table text-center border font"><thead >
                      </thead>
                      <tbody><tr className="font text-secondary ">
                        <td className="col-4 border">{item.company}</td>
                        <td className="col-4 border">{item.exp}</td>
                        <td className="col-4 border">{item.role}</td>
                        <td className="col"><button onClick={()=>Delete('experience',index)} className="btn btn-outline-danger ">-</button></td></tr></tbody>
                    </table>
                  </div>
                )}
            </div>


            <div className="card p-3 mt-5 mb-5 font">
              <h5 className="font " >Area Of Interest : </h5>
              <div className="row">
              <input className=" border-rounded form-control col m-2"type="text" value={update.interest} onChange={(e)=>setUpdate({...update,interest:e.target.value})} />
              <button onClick={()=>Update('interest')} className="btn btn-outline-primary   col-sm-1">+</button>
              </div>
              <div className="font mt-3">
                {form.interest.map((item,index)=><div key={index} className='row'><li className='col-11'>{item}   </li><button className="btn font btn-sm  btn-outline-danger col" onClick={()=>Delete('interest',index)} >-</button></div>)}
                
              </div>
            </div>
            <div className="card p-3 mb-5 font">
              <h5 className="font " >Hobbies : </h5>
              <div className="row">
              <input className=" border-rounded form-control col m-2"type="text" value={update.hobby} onChange={(e)=>setUpdate({...update,hobby:e.target.value})} />
              <button onClick={()=>Update('hobby')} className="btn btn-outline-primary   col-sm-1">+</button>
              </div>
              <div className="font mt-3">
                {form.hobby.map((item,index)=><div key={index} className='row'><li className='col-11'>{item}   </li><button className="btn font btn-sm  btn-outline-danger col" onClick={()=>Delete('hobby',index)} >-</button></div>)}
                
              </div>
            </div>

            

            <div className="card p-3  align font">
            <h4 className="font">Personal Details : </h4>
            <div className="row mt-3 mb-3">
              <h5 className="col-2  ">Father Name : </h5>
              <input className='form-control col ' onChange={(e)=>Change('father_name',e.target.value,0)} placeholder="Enter Your Father's Name"/>
            </div>
            <div className="row mt-3 mb-3">
              <h5 className="col-2  ">Mother Name : </h5>
              <input className='form-control col ' onChange={(e)=>Change('mother_name',e.target.value,0)} placeholder="Enter Your Mother's Name"/>
            </div>
            <div className="row mt-3 mb-3">
              <h5 className="col-2  ">Sibling Name : </h5>
              <input className='form-control col ' onChange={(e)=>Change('sibling_name',e.target.value,0)} placeholder="Enter Your Sibling's Name"/>
            </div>
            <div className="row mt-3 mb-3">
              <h5 className="col-2  ">Age : </h5>
              <input className='form-control col 'onChange={(e)=>Change('age',e.target.value,0)}  placeholder="Enter Your Age"/>
            </div>
            <div className="row mt-3 mb-3">
              <h5 className="col-2  ">Blood Group : </h5>
              <input className='form-control col ' onChange={(e)=>Change('blood_group',e.target.value,0)} placeholder="Enter Your Blood Group"/>
            </div>
            
              
              <div className="row mt-3 mb-3">
              <h5 className=" col-2 " >Languages :</h5>
              <input className=" border-rounded form-control col m-2"type="text" value={update.language} onChange={(e)=>setUpdate({...update,language:e.target.value})} placeholder='Languages Known' />
              <button onClick={()=>Update('language')} className="btn btn-outline-primary  col-1 ">+</button>
              </div>
              <div className="font mt-3">
                {form.language.map((item,index)=><div key={index} className='row'><li className='col-11'>{item}   </li><button className="btn font btn-sm  btn-outline-danger col" onClick={()=>Delete('language',index)} >-</button></div>)}
                
              
            </div>
            
            <div className="row mt-3 mb-3">
              <h5 className="col-2  ">Gender : </h5>
              <input className='form-control col 'onChange={(e)=>Change('gender',e.target.value,0)}  placeholder="Enter Your Gender"/>
            </div>
            <div className="row mt-3 mb-3">
              <h5 className="col-2  ">Maritial Status : </h5>
              <input className='form-control col ' onChange={(e)=>Change('maritial_status',e.target.value,0)} placeholder="Enter Your Maritial Status"/>
            </div>
            <div className="row mt-3 mb-3">
              <h5 className="col-2  ">Address : </h5>
              <textarea className='form-control col 'onChange={(e)=>Change('address',e.target.value,0)}  placeholder="Enter Your Address"></textarea>
            </div>
      
          </div>

          <div className="text-center">
        
            <button type="button" onClick={()=>Create()} className="btn btn-primary mb-5 mt-5" >Save Resume</button>
           
          </div>
          <div>
          {getresume&& getresume.map((item,index)=>{
            // console.log(item.data)
            
            
        return(<div key={index}>
                
                  <table className='table table-bordered text-center text-secondary table-striped'>
                    <thead>
                      <tr>
                        <th>SI.NO</th>
                        <th>Name</th>
                        <th colSpan={2}>Action</th>
                      </tr>
                    </thead>
                          <tbody  >
                         
                          <tr >
                            <td className="text-secondary">
                                {index+1}
                            </td>
                            <td className="text-secondary">                             
                              {JSON.parse(item.data).name}
                            </td>
                            <td className="text-secondary" >
                                <button className='btn btn-outline-warning' type='button' onClick={()=>Deleteresume(item.id)}  >Delete</button>
                            </td>
                            <td>
                              <Link to={`/view/${item.id}`}><button className='btn btn-outline-success'>View</button> </Link>
                            </td>
                          </tr>
                          </tbody>
                       </table>
          
        </div>
        )}
        )}
        </div>
            </div>
            <Footer/>
        </>
    )
}
export default Form