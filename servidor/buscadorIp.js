
var ip=require("ip");
var res=ip.address().split(".");
var num1=res[0];
var num2=res[1];
var num3=0;
var num4=0;
var ip=null;
var intervalo=setInterval(()=>{
	var ips=num1+"."+num2+"."+num3+"."+num4;
	var aux1 = new net.Socket()
	aux1.connect(3000, ips,()=>{
		aux1.on("data",(data)=>{
			var obj=JSON.parse(data.toString("utf-8"));
			if(obj.tipo!=null){
				ip=ips;
			}
			aux1.end();
			cerrar();
		});
	})
	aux1.on("error",()=>{
		aux1.end();
	});
	if(num4<=255){
		num4++;
	}else if(num3<=255){
		num3++;
		num4=0;
	}
},1);

function cerrar(){
	console.log(ip);
	clearInterval(intervalo);
}