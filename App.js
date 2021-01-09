/**
 * 汇率请求接口没有任何请求介绍，尝试了接口只能将人民币转美元或卢布
 */

import React, {
	useState,
	useEffect,
	
} from 'react';

import 'element-theme-default';

import {
	Input,
	Button,
	Select,
	Form,
	Table,
	Checkbox,

} from 'element-react';

import axios from "axios";


function App() {
	//下拉选项
	let [{
		options
	}] = useState({
		options: [{
			value: '选项1',
			label: '卢布'
		}, {
			value: '选项3',
			label: '人民币'
		}, {
			value: '选项4',
			label: '美元'
		}, {
			value: '选项2',
			label: '英镑',
			disabled: true
		}]
	});

	//汇率请求
	const [data, setData] = useState([]);
	useEffect(() => {
		const fetchData = async () => {
			const result = await axios(
				'https://api.globus.furniture/forex',
			);
			setData([result.data]);

		};
		fetchData();
	}, []);



	//表单头部数据
	const [columns] = useState([
		{
			label:"选项",
			prop: "box",
			width: 180
		},
		{
			label: "任务",
			prop: "date",
			width: 180
		},
		{
			label: "价格",
			prop: "name",
			width: 180
		},
		{
			label: "货币类型",
			prop: "address"
		}
	])
	
	//总金额
	let [count,setCount] = useState(0)
	//表单数据
	const [list,setLiset] = useState([])
	//任务
	const [task,setTask] =useState("")
	//价格
	const [price,setPrice] =useState("")
	//货币类型
	const [address,setAddress] =useState("")
	//已完成的表单
	const [buy,setBuy] = useState([])
	//已完成表单的总金额
	let [BuyCount,setBuyCount] = useState(0)

	
	
	
	function onSubmit() {
		//把数据添加到表单
		setLiset([...list,{
			box:<Checkbox></Checkbox>,
			date: task,
			name: price,
			address: address,
			}])
			
			
	  };

	function toBuy(){
		//清空计划项表单跟总金额
		setLiset([]);
		setBuyCount(count);
		setCount(0)
	}
	
	

	return (
	<div id = "all" >

		{
			data.map(item => ( 
			<div  key={item.USD.value}>
				<p > 货币的汇率: RMB - > USD: {item.USD.value} - RMB - > RUB: {item.RUB.value} < /p> 
			< /div >
			))
		}


		<Form inline = {true}  className = "demo-form-inline" >

		<Form.Item >
		<Input placeholder = "任务编辑" name='task' onChange={e=>{setTask(e)}} required / >
		</Form.Item> 

		<Form.Item >
		<Input placeholder = "价格编辑" name='price' onChange={e=>{setPrice(e)}} required / >
		</Form.Item> 

		<Form.Item >
		<Select onChange={e=>{setAddress(e)}}> {
			options.map(el => {
				return <Select.Option key = {
					el.value
				}
				label = {
					el.label
				}
				value = {
					el.label
				}
				disabled = {
					el.disabled
				}
				/>
			})
		} 
		</Select>

		</Form.Item >


		<Form.Item >
		<Button onClick={e=>{onSubmit();setCount(count+Number(price))}} type="primary">添加</Button>
		< /Form.Item >

		<Form.Item >
		<Button  type="success" onClick={e=>{setBuy(list);toBuy()}}>购买</Button>
		< /Form.Item >



		</Form>

		<Table style = {
			{
				width: '100%'
			}
		}
		columns = {
			columns
		}
		data = {
			list
		}
		stripe = {
			true
		}
		/> 
		<p style={{float: 'right'}}>应付: {count}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
		
	<Table style = {
		{
			width: '100%'
		}
	}
	columns = {
		columns
	}
	data = {
		buy
	}
	stripe = {
		true
	}
	/> 
	<p style={{float: 'right'}}>已付: {BuyCount}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
		
		< /div >


	)
};

export default App;
