var UP=38,RIGHT=39,DOWN=40,LEFT=37;

var numCss = {'0':{'bgColor':'#CCC0B4','color':'','font-size':''},
	2:{'bgColor':'#EEE4DA','color':'#776E65','font-size':'4em'},
	4:{'bgColor':'#EDE0C8','color':'#776E65','font-size':'4em'},
	8:{'bgColor':'#F2B179','color':'#FFFFFF','font-size':'4em'},
	16:{'bgColor':'#EC8D54','color':'#FFFFFF','font-size':'3em'},
	32:{'bgColor':'#F67C5F','color':'#FFFFFF','font-size':'3em'},
	64:{'bgColor':'#EA5937','color':'#FFFFFF','font-size':'3em'},
	128:{'bgColor':'#F3D86B','color':'#FFFFFF','font-size':'2.5em'},
	256:{'bgColor':'#F1D04B','color':'#FFFFFF','font-size':'2.5em'},
	512:{'bgColor':'#E4C02A','color':'#FFFFFF','font-size':'2.5em'},
	1024:{'bgColor':'#E2BA13','color':'#FFFFFF','font-size':'2em'},
	2048:{'bgColor':'#ECC400','color':'#FFFFFF','font-size':'2em'},
	4096:{'bgColor':'#F3D86B','color':'#FFFFFF','font-size':'2em'},
	8192:{'bgColor':'#F3D86B','color':'#FFFFFF','font-size':'2em'},
};

function getLiIndex(jq){
	return jQuery('ul li').index(jq);
}

function getLi(indx){
	return jQuery(jQuery('ul li').get(indx));
}

function updateByNum(jq,num){
	var temP = jq.find('p');
	if(num!=0){
		temP.text(num);
	}else{
		temP.text('');
	}
	temP.parent().css({
		background:numCss[num]['bgColor']+' url(skin/images/btn/bt1.png) top left no-repeat'
	});
	
	temP.css({
		'background':numCss[num]['bgColor']+' url(skin/images/btn/bt2.png) bottom left no-repeat',
		'color':numCss[num]['color'],
		'font-size':numCss[num]['font-size']
	});
}

var moved = false;
function move(jq,face){	
	if(jq.hasClass('moved')){
		return;
	}

	var indx = getLiIndex(jq);
	var num = jq.find('p').text();
	
	if(num==''){
		jq.addClass('moved');
		return;
	}	
	if(isTrapped(jq,face)){
		jq.addClass('moved');
		return;
	}
	
	var preLi = getPreLi(jq,face);	
	if(preLi.hasClass('moved')==false){
		move(preLi,face);
	}
	var preNum =  preLi.find('p').text();
	if(preNum==''){
		moved = true;
		updateByNum(preLi, num);
		updateByNum(jq, 0);
		if(isTrapped(preLi,face)==false){
			preLi.removeClass('moved');
			move(preLi,face);
		}				
	}else if(preNum==num){				
		if(preLi.hasClass('margered')==false){
			moved = true;
			marger(jq,preLi,face);
			preLi.addClass('margered');
		}				
	}	
	jq.addClass('moved');
}

function isTrapped(jq, face){
	switch(face){
		case UP:
			return getLiIndex(jq)<4;
		case RIGHT:
			return getLiIndex(jq)%4==3;
		case DOWN:
			return getLiIndex(jq)>11;
		case LEFT:
			return getLiIndex(jq)%4==0;
	}
}

function getPreLi(jq, face){
	var indx = getLiIndex(jq);
	var preLi;
	switch(face){
		case UP:
			if(indx>3){
				preLi = getLi(indx-4);
			}
			break;
		case RIGHT:
			if(indx%4!=3){
				preLi = getLi(indx+1);
			}
			break;
		case DOWN:
			if(indx<12){
				preLi = getLi(indx+4);
			}
			break;
		case LEFT:
			if(indx%4!=0){
				preLi = getLi(indx-1);
			}
			break;
	}
	return preLi
}

function marger(jq1,jq2,face){
	var num1 = jq1.find('p').text();
	var num2 = jq2.find('p').text();
	if(num1!=num2) return false;
	
	var indx1 = getLiIndex(jq1);
	var indx2 = getLiIndex(jq2);
	switch(face){
		case 38:
			if(Math.abs(indx1-indx2)!=4)return;
			if(indx1>indx2){
				updateByNum(jq2, num2*2);
				updateByNum(jq1, 0);
			}else{
				updateByNum(jq1, num1*2);
				updateByNum(jq2, 0);
			}
			break;
		case 39:
			if(Math.abs(indx1-indx2)!=1)return;
			if(indx1>indx2){
				updateByNum(jq1, num2*2);
				updateByNum(jq2, 0);
			}else{
				updateByNum(jq2, num1*2);
				updateByNum(jq1, 0);
			}
			break;
		case 40:
			if(Math.abs(indx1-indx2)!=4)return;
			if(indx1>indx2){
				updateByNum(jq1, num2*2);
				updateByNum(jq2, 0);
			}else{
				updateByNum(jq2, num1*2);
				updateByNum(jq1, 0);
			}
			break;
		case 37:
			if(Math.abs(indx1-indx2)!=1)return;
			if(indx1>indx2){
				updateByNum(jq2, num2*2);
				updateByNum(jq1, 0);
			}else{
				updateByNum(jq1, num1*2);
				updateByNum(jq2, 0);
			}
			break;
	}
}

function addNum(indx, num){
	var emptys = jQuery('ul li p');	
	updateByNum(jQuery(emptys[indx]).parent(),num);	
}

function addRandomNum(){
	var nums = [2,2,2,4];
	var ran = parseInt(Math.random()*100)%4;
	var  num = nums[ran];	
	var emptys = jQuery('ul li p:empty')
	var indx  =  parseInt(Math.random()*emptys.length)
	
	updateByNum(jQuery(emptys[indx]).parent(),num);	
}

var cloneList = [];
function goBack(){
	if(cloneList.length>0){
		jQuery('#main').replaceWith(cloneList.pop());
	}		
}

function inGrid(grid){
	var li = '<li><p></p></li>';
	var ul = '<ul></ul';
	var ul1 = jQuery(ul)
				.append(jQuery(li))
				.append(jQuery(li))
				.append(jQuery(li))
				.append(jQuery(li))
				.addClass('firstUl');
	var ul2 = jQuery(ul)
				.append(jQuery(li))
				.append(jQuery(li))
				.append(jQuery(li))
				.append(jQuery(li));
	var ul3 = jQuery(ul)
				.append(jQuery(li))
				.append(jQuery(li))
				.append(jQuery(li))
				.append(jQuery(li));
	var ul4 = jQuery(ul)
				.append(jQuery(li))
				.append(jQuery(li))
				.append(jQuery(li))
				.append(jQuery(li))
				.addClass('lastUl');				
	jQuery('#'+grid).append(ul1).append(ul2).append(ul3).append(ul4);
	
	jQuery('ul li').each(function(){
		updateByNum(jQuery(this),0)
	});	
}

function moveAll(face){
	var c = jQuery('#main').clone();			
	moved = false;			
	
	jQuery('ul li').each(function(){
		move(jQuery(this),face);
	});
	
	jQuery('ul li').removeClass('moved margered');
	
	if(moved){
		addRandomNum();
		if(cloneList.length>100){
			cloneList.shift();
		}
		cloneList.push(c);
		return true;
	}
	return false;	
}

function isOver(){
	var m1 = moveAll(UP);
	if(m1){
		goBack();
		return false;
	}
	var m2 = moveAll(RIGHT);
	if(m2){
		goBack();
		return false;
	}
	var m3 = moveAll(DOWN);
	if(m3){
		goBack();
		return false;
	}
	var m4 = moveAll(LEFT);
	if(m4){
		goBack();
		return false;
	}
	return true;
}

jQuery(function(){
	inGrid('main');
	jQuery('#main').show();
	/*addRandomNum();
	addRandomNum();*/
	addNum(2,4);
	addNum(4,8);
	addNum(3,2);
	addNum(12,256);
	addNum(10,512);
	addNum(8,2);
	addNum(1,1024);
	addNum(5,16);
	addNum(14,2048);
	addNum(9,2048);
	addNum(7,4096);
	addNum(0,8192);

	jQuery(this).keyup(function(event){		
		var  face =event.keyCode;
		if(face<41&&face>36){
			moveAll(face);
			if(isOver()){
				alert('Game Over!');
			}
		}				
		if(face==90 && event.ctrlKey){
			goBack();
		}
	});
})