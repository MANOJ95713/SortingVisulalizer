import './App.css'
import { Component, useEffect, useState } from 'react'
import { Slider } from 'primereact/slider';
import React from 'react'
import ReactSlider from 'react-slider';

export const SortingVisualizer = () => {
    
    const [array,setArray]=useState([]);
    const [algorithm,setAlgorithm]=useState("");
    const [speed,setSpeed]=useState(100);
    const [size,setSize]=useState(25);
    const [currSwapp,setCurrSwap]=useState([]);
    const [sorted,setSorted]=useState([]);
    const [swapped,setSwapped]=useState([]);
    const [currmin,setCurrmin]=useState(-1);
    const [currMid,setCurrMid]=useState(-1);
    
    const resetArray=()=>{
        let temporaryArray=[];
        for(let i=0;i<size;i++){
          temporaryArray.push(randomFromIntervals(5,1000));
        }
        console.log(temporaryArray);
        setArray(temporaryArray);
        console.log("Array",array);
    }
    
    useEffect(()=>{
       resetArray();
    },[]);

   const randomFromIntervals=(min,max)=>{
     return Math.floor(Math.random()*(max-min+1)*min);
   }
   
   const bubbleSort=async ()=>{
     let newarray=[...array];
     let activeArray=[];
     let swapArray=[];
     let finalAns=[];
     for(let i=0;i<newarray.length;i++){
      
      for(let j=0;j<(newarray.length-i-1);j++){
        activeArray.push(j);
        activeArray.push(j+1);
        setCurrSwap([...activeArray]);
        await new Promise((resolve) => setTimeout(resolve,speed));
        if(newarray[j]>newarray[j+1]){
             
             let temp=newarray[j+1];
             newarray[j+1]=newarray[j];
             newarray[j]=temp;
             swapArray.push(j);
             swapArray.push(j+1);
             activeArray=activeArray.filter((item)=>(item!=j&&item!=j+1));
             setCurrSwap([...activeArray]);
             setSwapped([...swapArray]);
            
             setArray([...newarray]);
            
            
           
          }
          //  console.log(speed);
          await new Promise((resolve) => setTimeout(resolve,speed));
          
          activeArray=activeArray.filter((item)=>(item!=j&&item!=j+1));
          swapArray=swapArray.filter((item)=>(item!=j&&item!=j+1));
          setCurrSwap([...activeArray]);
          setSwapped([...swapArray]);
          
      }
      finalAns.push(newarray.length-i-1);
      setSorted([...finalAns]);
      activeArray=activeArray.filter((item)=>item!=i);
      setCurrSwap([...activeArray]);
      
     }

   }


   const selectionSort=async()=>{
      let newarray=[...array];
      let activeArray=[];
      let finalAns=[];
      for(let i=0;i<newarray.length;i++){
        let mini=newarray[i];
        let minindex=i;
        activeArray.push(i);
        setCurrSwap([...activeArray]);
        // await new Promise((resolve) => setTimeout(resolve,speed));
        for(let j=i+1;j<newarray.length;j++){
                 
                 
                 activeArray.push(j);
                 setCurrSwap([...activeArray]);
                 await new Promise((resolve) => setTimeout(resolve,speed));
                 if(newarray[j]<mini) {
                  activeArray=activeArray.filter((item)=>item!=j);
                  setCurrSwap([...activeArray]);
                  setCurrmin(j);
                  mini=newarray[j];
                  minindex=j;
                  await new Promise((resolve) => setTimeout(resolve,speed));
                 }
                 activeArray=activeArray.filter((item)=>item!=j);
                 setCurrSwap([...activeArray]);
                 
        }
        let temp=newarray[i];
        newarray[i]=mini;
        newarray[minindex]=temp;
        setArray([...newarray]);
        activeArray=activeArray.filter((item)=>item!=i);
        setCurrSwap([...activeArray])
        setCurrmin(-1);
        finalAns.push(i);
        setSorted([...finalAns]);
        await new Promise((resolve) => setTimeout(resolve,speed));
      }
   }

   const insertionSort=async()=>{
       let newarray=[...array];
       let activeArray=[];
      
       for(let i=1;i<newarray.length;i++){
         let j=i-1;
         let key=newarray[i];
         setCurrmin(i);
         
     
         await new Promise((resolve) => setTimeout(resolve,speed));
         while(j>=0&&newarray[j]>key){
            activeArray.push(j);
            // activeArray.push(j+1);
            setCurrSwap([...activeArray]);
            newarray[j+1]=newarray[j];
            newarray[j]=key;
            setArray([...newarray])
            await new Promise((resolve) => setTimeout(resolve,speed));
            activeArray=activeArray.filter((item)=>item!=j);
            setCurrSwap([...activeArray]);
            setCurrmin(j);
            j--;
         }
        
        setCurrmin(-1);
        //  finalAns.push(i);
        //  setSorted([...finalAns]);
         
         
       }
   }

  
   const merge=async (s,e,newarray,activeArray)=>{
       let mid=Math.floor(s+(e-s)/2);
       let start1=s;
       let start2=mid+1;
       setCurrMid(mid);
       await new Promise((resolve) => setTimeout(resolve,speed));
       while(start1<=mid&&start2<=e){
          activeArray=[start1,start2];
          setCurrSwap(activeArray);
          await new Promise((resolve) => setTimeout(resolve,speed));
          setCurrSwap([]);
          if(newarray[start1]<=newarray[start2]){
             start1++;
          }
          else{
            let val=newarray[start2];
            let index=start2;
            while(index!=start1){
               
               newarray[index]=newarray[index-1];
               newarray[index-1]=val;
               activeArray=[index,index-1];
               setSwapped([...activeArray]);
               setArray([...newarray]);
               await new Promise((resolve) => setTimeout(resolve,speed));
           
               setSwapped([]);

               index--;
            }
           
            // newarray[start1]=val;
            // setArray([...newarray]);
            // await new Promise((resolve) => setTimeout(resolve,speed));
            start1++;
            mid++;
            start2++;
          }
       }
       setCurrMid(-1);
         
         
       
      

    }
   const mergeSort=async(s,e,newarray,activeArray)=>{
        if(s>=e) return ;
        let mid=Math.floor(s+(e-s)/2);
        // midArray.push(mid);
        // setCurrMid([...midArray]);
        // await new Promise((resolve) => setTimeout(resolve,speed));
        await mergeSort(s,mid,newarray,activeArray);

        await new Promise((resolve) => setTimeout(resolve,speed));

        await mergeSort(mid+1,e,newarray,activeArray);
       
        await new Promise((resolve) => setTimeout(resolve,speed));
        
        await merge(s,e,newarray,activeArray);
        // await new Promise((resolve) => setTimeout(resolve,speed));
        // midArray=midArray.filter((item)=>item!==mid);
        // setCurrMid([...midArray]);
        // console.log(currMid);
        // await new Promise((resolve) => setTimeout(resolve,speed));
   }


   
   const partition=async (newarray,low,high,activeArray)=>{
        let i=low-1;
        activeArray=[];
        for(let j=low;j<=high;j++){
          
          if(newarray[j]<newarray[high]){
            i++;
            activeArray.push(i);
            activeArray.push(j);
            setCurrSwap([...activeArray]);
            let temp=newarray[i];
            newarray[i]=newarray[j];
            newarray[j]=temp;
            setArray([...newarray]);
            await new Promise((resolve) => setTimeout(resolve,speed));
            activeArray=activeArray.filter((e)=>e!=i&&e!=j);
            setCurrSwap([]);
          }
          // await new Promise((resolve) => setTimeout(resolve,speed));
        }
        
        i++;
        activeArray.push(i);
        activeArray.push(high);
        setCurrSwap([...activeArray]);
        let temp=newarray[i];
        newarray[i]=newarray[high];
        newarray[high]=temp;
        setArray([...newarray]);
        await new Promise((resolve) => setTimeout(resolve,speed));
        activeArray=activeArray.filter((e)=>e!=i&&e!=high);
        setCurrSwap([]);
        return i;
   }
   const quickSort=async (low,high,newarray,activeArray,correct)=>{
        if(low>=high) {
        correct.push(low);
        setSorted([...correct]);
          return ;
        }
      
        let pivot=await partition(newarray,low,high,activeArray);
       
        correct.push(pivot);
        setSorted([...correct]);
        
        await quickSort(low,pivot-1,newarray,activeArray,correct);
        await new Promise((resolve) => setTimeout(resolve,speed));
        await quickSort(pivot+1,high,newarray,activeArray,correct);
        await new Promise((resolve) => setTimeout(resolve,speed));
   }


  const heapify=async (newarray,n,i)=>{
      //  console.log(newarray);
       let largest=i;
       let ch=[];
       let swap=[];
       while(i<=n){
       
       let l=(2*i+1);
       let r=(2*i+2);
       ch.push(i);
       
     
      //  await new Promise((resolve) => setTimeout(resolve,speed));
       if(l<=n){
        ch.push(l);
       
         if(newarray[l]>newarray[largest]){
          largest=l;
         }
       }
       if(r<=n){
        ch.push(r);
       
        if(newarray[r]>newarray[largest]){
          largest=r;
         }
       }
       setCurrSwap([...ch]);
       await new Promise((resolve) => setTimeout(resolve,speed));
       if(largest!=i){
          
          let temp=newarray[i];
          newarray[i]=newarray[largest];
          newarray[largest]=temp;
          swap.push(i);
          swap.push(largest);
          ch=ch.filter((e)=>e!=largest&&e!=i);
          setCurrSwap([...ch]);
          // await new Promise((resolve) => setTimeout(resolve,speed));
          setSwapped([...swap]);
          setArray([...newarray]);
          await new Promise((resolve) => setTimeout(resolve,speed));
          ch=ch.filter((e)=>e!=l&&e!=r&&e!=i);
          setCurrSwap([...ch]);
          swap=swap.filter((e)=>e!=largest&&e!=i);
          setSwapped([...swap]);

          i=largest;
       }
       else{
        ch=ch.filter((e)=>e!=l&&e!=r&&e!=i);
          setCurrSwap([...ch]);
        break;
       }
      }
     
  }

  const heapSort=async (newarray,n)=>{
    let sort=[];
     for(let i=Math.floor(n/2)-1;i>=0;i--){
       await heapify(newarray,n-1,i);

     }
     console.log("heapified array",newarray);     
     for(let i=n-1;i>0;i--){
      let temp=newarray[i];
      newarray[i]=newarray[0];
      newarray[0]=temp;
      sort.push(i);
      setSorted([...sort]);
      setArray([...newarray]);
      await new Promise((resolve) => setTimeout(resolve,speed));
      await heapify(newarray,i-1,0);
      // await new Promise((resolve) => setTimeout(resolve,speed));  

     }
     sort.push(0);
      setSorted([...sort]);
    // console.log(newarray);     

  }


   const handleAlgo=async ()=>{
        
        let newarray=[...array];
        let correct=[];

        let activeArray=[];
        if(algorithm=="bubble"){
            bubbleSort();
        }
        if(algorithm=="quick"){
            quickSort(0,newarray.length-1,newarray,activeArray,correct);
        }
        if(algorithm=="merge"){
          mergeSort(0,newarray.length-1,newarray,activeArray);
        }
        if(algorithm=="insertion"){
          insertionSort();
        }
        if(algorithm=="selection"){
        selectionSort();
        }
        if(algorithm=="heap"){
          heapSort(newarray,newarray.length);
        }
   }

  

  return (
    
    <div className='container'>
                 <div>
                 
                  {
          array.map((item, idx) => (
    currSwapp.includes(idx) ? (
      <div className="bars" key={idx} style={{ height: `${item / 7}px`, width: `${950 / array.length}px`, background: 'red' }}></div>
    ) :(swapped.includes(idx)||idx==currmin)? (
      <div className="bars" key={idx} style={{ height: `${item / 7}px`, width: `${950 / array.length}px`, background: 'green' }}></div>
    ):(currMid==idx)?(<div className="bars" key={idx} style={{ height: `${item / 7}px`, width: `${950 / array.length}px`, background: 'yellow' }}></div>):(sorted.includes(idx))?(<div className="bars" key={idx} style={{ height: `${item / 7}px`, width: `${950 / array.length}px`, background: 'violet' }}></div>):(<div className="bars" key={idx} style={{ height: `${item / 7}px`, width: `${950 / array.length}px`, background: 'blue' }}></div>)
  ))
}

                 
                 
    </div>
                

                <div className='btn-cont'>
                    <input name='size' id='size' value={size} placeholder='size of Array' onChange={(e)=>setSize(e.target.value)}></input>
                    <button onClick={()=>resetArray()} className='btn'>Generate New Array</button>
                    
                    <select onChange={(e)=>{setAlgorithm(e.target.value)}}name='algorithm' id='algorithm' value={algorithm}>
                        <option value={""}>Select An Algorithm</option>
                        <option value={"quick"}>Quick Sort</option>
                        <option value={"merge"}>Merge Sort</option>
                        <option value={"insertion"}>Insertion Sort</option>
                        <option value={"heap"}>Heap Sort</option>
                        <option value={"selection"}>Selection Sort</option>
                        <option value={"bubble"}>Bubble Sort</option>
                    </select>


                    <button className='btn' onClick={handleAlgo}>Run Algo</button>
                   

                    <div className='slider-container'>
          <label>
            Speed
          </label>
          <input
        type="range"
        min="100"
        max="1000"
        value={speed}
        onChange={(e) => setSpeed(e.target.value)}
        className="slider"
      />
      <span>{speed}</span>
                    </div>
             </div>
    </div>
  )


}

