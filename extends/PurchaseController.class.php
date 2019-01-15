<?php
namespace Home\Controller;
use Think\Controller;
class PurchaseController extends BasautoController {
   	public function project_home(){
   		//var_dump(C('Cache_Time'));
   		//if(!S('data_genre2') || !S('data_genre1')){
			//优质项目genre=1
			$map1=array();
			$map1['input_time']= array('lt',time());
			$map1['genre']=1;
			$map1['status']=3;
			$data1=M('purchase_project')->field('pid,pname,lasttime,buy_type,pay_type,genre,image,describe,sources,input_time')->where($map1)->limit(6)->order('input_time DESC')->select();
			S('data_pur_genre1',$data1,C('Cache_Time'));
			//自营项目genre=2
			$map2=array();
			$map2['input_time']= array('lt',time());
			$map2['genre']=2;
			$map2['status']=3;
			$data2=M('purchase_project')->field('pid,pname,lasttime,buy_type,pay_type,genre,image,describe,sources,input_time')->where($map2)->limit(6)->order('input_time DESC')->select();
			S('data_pur_genre2',$data2,C('Cache_Time'));
			//在行项目
			$data3=M('project_sign as a')->join('vfl_purchase_project as b')->field('projid,signtime,a.pname,url,b.describe,b.image,b.lasttime,b.input_time')->where('a.projid=b.pid')->group('projid')->limit(6)->order('input_time DESC')->select();
			S('data_pur_genre3',$data3,C('Cache_Time'));

            //轮播图
            if($_GET['bid']){//是否为预览
            	$map = array(
                	'bid' =>$_GET['bid'],
           		 );
            }else{
            	$map = array(
                	'type' => 3,
                	'status' => 1,
           		 );
            }
            $banners=M('banner')->field('url,title,images')->where($map)->order('listorder DESC')->select();
            $this->assign('banners',$banners);
		//}
		//var_dump(S('data_pur_genre1'));
		$this->assign('data_pur_genre3',S('data_pur_genre3'));
		$this->assign('data_pur_genre1',S('data_pur_genre1'));
		$this->assign('data_pur_genre2',S('data_pur_genre2'));
    	$this->display();
	}
	public function project_center(){
		C('URL_MODEL',0);
		//跨境工程一级分类
    	$business=appoint_business();
		$map=array();
		if($_GET['keywords']){
			$condition['pname'] =array('like',array('%'.$_GET['keywords'].'%'));
			$condition['pid'] = array('like',array('%'.$_GET['keywords'].'%'));;
			$condition['_logic'] = 'or';
			$map['_complex'] = $condition;
		}
		
		if($_GET['business_id']!='all' && $_GET['business_id']!=NULL){
			$map['business_id']	  =	$_GET['business_id'];
		}
		if($_GET['business_id_two']!=NULL){
			$map['business_id_two']	  =	$_GET['business_id_two'];
		}
		if($_GET['business_id_three']!=NULL){
			$map['business_id_three'] =	$_GET['business_id_three'];
		}
		if($_GET['buy_type']!='all' && $_GET['buy_type']!=NULL){
			$map['buy_type']	  =	$_GET['buy_type'];
		}
		if($_GET['countryid']!='all' && $_GET['countryid']!=NULL){
			$map['countryid'] =	$_GET['countryid'];
		}
        if($_GET['pay_type']!='all' && $_GET['pay_type']!=NULL){
            $map['pay_type']     =	$_GET['pay_type'];
        }

        if($_GET['starttime']!=NULL && $_GET['endtime']!=NULL){
            $starttime = strtotime($_GET['starttime']);
            $endtime = strtotime($_GET['endtime']);
            $map['lasttime'] = array('between',$starttime.','.$endtime);
        }
        if($_GET['genre'] != 3){
            if($_GET['genre']!='all' && $_GET['genre']!=NULL){
                $map['genre']     =	$_GET['genre'];
            }


            $map['input_time']= array('lt',time());//只查看当前时间之前的时间  ：有定时发送的新闻  在当前时间之后的不做显示
            //var_dump($map);
            $map['status']=3;
            $map2=array();
            $map2['status']=3;
            $map2['input_time']= array('lt',time());
            $sum   = M('purchase_project')->where($map2)->count();// 查询总记录数
            $count = M('purchase_project')->where($map)->count();// 查询满足要求的总记录数
            //获取每页显示行数，没有就给一个默认值
            $show_num = I('get.show_num')?I('get.show_num'):10;

            if($count<=$show_num){
                $_GET['p'] = 1;
            }
            $Page  = new \Think\Page($count,$show_num);// 实例化分页类 传入总记录数和每页显示的记录数
            $show  = $Page->show();// 分页显示输出
            $data=M('purchase_project')->where($map)->limit($Page->firstRow.','.$Page->listRows)->order('input_time DESC')->select();
            //var_dump($data);
            //左侧热门项目推荐
            $data_hits=M('purchase_project')->field('pid,pname,countryid,type,sources,image,business_id')->where($map2)->limit(0,3)->order('hits DESC')->select();
        }else{
            $map2=array();
            $map2['status']=3;
            $map2['input_time']= array('lt',time());
            $sum   = M('purchase_project')->where($map2)->count();// 查询总记录数
            //$count = M('purchase_project')->where($map)->count();// 查询满足要求的总记录数
            $count = count(M('project_sign as a')->join('vfl_purchase_project as b  on a.projid = b.pid')->field('b.pname,b.input_time,b.hits,a.projid,b.countryid,b.business_id,b.lasttime,b.num,b.pay_type,b.image')->where($map)->group('a.projid')->select());// 查询满足要求的总记录
            //获取每页显示行数，没有就给一个默认值
            $show_num = I('get.show_num')?I('get.show_num'):10;
            
            if($count<=$show_num){
                $_GET['p'] = 1;
            }
            $Page  = new \Think\Page($count,$show_num);// 实例化分页类 传入总记录数和每页显示的记录数
            $show  = $Page->show();// 分页显示输出
            //$data=M('purchase_project')->where($map)->limit($Page->firstRow.','.$Page->listRows)->order('input_time DESC')->select();
            $data=M('project_sign as a')->join('vfl_purchase_project as b  on a.projid = b.pid')->field('b.pname,b.input_time,b.hits,pid,sources,b.countryid,b.business_id,b.lasttime,b.num,b.pay_type,b.image')->where($map)->group('a.projid')->limit($Page->firstRow.','.$Page->listRows)->group('a.projid')->order('a.signtime DESC')->select();
            //var_dump($data);
            //左侧热门项目推荐
            $data_hits=M('purchase_project')->field('pid,pname,countryid,type,sources,image,business_id')->where($map2)->limit(0,3)->order('hits DESC')->select();
        }
        //国家A_Z的形式展示
		//热门行业  || A-Z的形式筛选
		//<!----热门国家开始----->
		
		//查询当前字母下的国家
		//$data[$v['num']]['country']=M('country')->where(array('is_hot'=>1,'num'=>$v['num']))->select();
		$data_hot=M('country')->where(array('is_hot'=>1))->select();
		
		//<!----热门国家结束----->
		//指定参数
		//$num='A,B,C,D||E,F,G,H||I,J,K,L||M,N,O,P||Q,R,S,T||U,V,W,X||Y,Z';
		$num=array('ABCD'=>'A,B,C,D',
				   'EFGH'=>'E,F,G,H',
				   'IJKL'=>'I,J,K,L',
				   'MNOP'=>'M,N,O,P',
				   'QRST'=>'Q,R,S,T',
				   'UVWX'=>'U,V,W,X',
				   'YZ'  =>'Y,Z'
				   );
		foreach($num as $k=>$v){
			$slip=explode(',',$v);
			foreach($slip as $kk=>$vv){
				$arrll[$k]['country'][$vv['num']]['country']=M('country')->where(array('num'=>$vv['num'],'is_hot'=>0))->select();
			}
		}
		//echo M()->_sql();	   
		$this->assign('arrll',$arrll);
		$this->assign('data',$data);
		$this->assign('data_hot',$data_hot);
		$this->assign('data_hits',$data_hits);
    	$this->assign('business',$business);
    	$this->assign('page',$show);// 赋值分页输出
        $this->assign('sum',$sum);//总记录数
        $this->assign('count',$count);//筛选出总记录数
    	$this->display();
	}
	//项目详情
	public function project_show($pid,$sources){
		//每次访问 点击量+1
		M('purchase_project')->where(array('pid'=>$pid))->setInc('hits');
		switch($sources){
			case 3: $table_name='vfl_cross_project_website';
					break;
			case 2: $table_name='vfl_cross_project_owner';
					break;
			case 1: $table_name='vfl_cross_project_agency';
					break;
		}
		try {  
			$data=M('purchase_project  as  a')->join("$table_name  as  b  on b.sitid = a.pid")->where(array('pid'=>$pid))->find();
			//项目经理资料
			$pm_data=M('pmanager')->where(array('cid'=>$data['pm_id']))->find();
			if(!$data||!$pm_data){
				$this->error('您访问的页面出错了~~');
			}
			//项目截止天数
			if($data['lasttime']-time()>86400){
				$data['day']=timediff(time(),$data['lasttime']);
			}elseif($data['lasttime']<=time()){				
				$end_bm=True;//报名截止  按钮禁止点击
				$data['day']='已截止报名';
				$this->assign('end_bm',$end_bm);
			}else{
				//传递参数$lasttime 开启倒计时按钮
				$data['day']=timediff(time(),$data['lasttime']);
				$lasttime=date('Y-m-d H:i:s',$data['lasttime']);
				//var_dump($lasttime);
				$this->assign('lasttime',$lasttime);
			}
			//var_dump($data['day']);
			$map=array();
			$map['userid']=session('Uid');
    		$map['projid']=$pid;
    		$map['state']=1;
    		$this->assign('collect',$bbb=M('project_collect')->where($map)->find());
			//查看项目是否报名
			$map2=array();
			$map2['userid']=session('Uid');
    		$map2['projid']=$pid;
			$this->assign('sign',$aaa=M('project_sign')->where($map2)->find());
			//echo M()->_sql();
			//var_dump($aaa);
			$this->assign('pm_data',$pm_data);	
			$this->assign('data',$data);

            $tmp1 = explode('&&&',$data['closure']);
            $tmp2 = explode('&&&',$data['file_name']);
            foreach ($tmp2 as $k=>$v){
                //dump($k);
                $path = $tmp1[$k];
                $closure_info[$path] = $tmp2[$k];
            }
            //dump($closure_info);
            $this->assign('closure_info',$closure_info);
		} catch (\Exception $e) { 
			$this->error('您访问的页面出错了~~');
		}
		//dump($data);
		$this->display();		
	}
	
	//换一换推荐项目
	public function ajax_change_groom(){
	/*
	 原理：
	 	cookie保存用户点击次数   换一换相当于下一页   当所有数据循环结束后从第一个数据开始循环
	*/	
		$map=array();
		$map['input_time']= array('lt',time());
		$map['status']=3;
		$count = M('purchase_project')->where($map)->count();// 查询满足要求的总记录数
	    $page=$_COOKIE['pagell'];
	    $tololl=$page*3;
	    $page++;
	    setcookie("pagell",$page);
	     //$count  小于30条    重复总条数  否则 取前30条数据
	    $count>30?30:$count;
	    if($tololl>=$count){
	    	$tololl=0;
	    	setcookie('pagell',1);//把时间设为0，就是过期了
	    }
	    $data=M('purchase_project')->field('pid,sources,countryid,pname,image,business_id')->where($map)->limit($tololl,3)->order('input_time DESC')->select();
		//echo M()->_sql();
		foreach($data as $k=>$v){
			$data[$k]['countryid']=get_country($v['countryid']);
			$data[$k]['business_id']=get_pb($v['business_id']);
				
		}
		echo json_encode($data);
	}
	
	    
    //项目报名
    public function sign(){
    	$pid=$_POST['pid'];
    	//限制用户必须登录
    	//session('Uid','180518001');
    	if(session('Uid')){
	    	//用户已登录且已完善企业信息可以报名
	    	//查询项目先相关信息
	    	$map=array();
	    	$map['userid']=session('Uid');
	    	$map['projid']=$pid;
	    	$map['status']=array('in','1,3');
	    	if(M('project_sign')->where($map)->find()){
	    		$msg=array('status'=>0,'msg'=>'您已报名参与过该项目');
	    	}else{
	    		//限制用户必须通过审核才可以报名	
		    	$corp_status=M('ucenter_corp')->where(array('uid'=>session('Uid')))->getField('states');
		    	switch($corp_status){
		    		case 3:
		    			$phone=M('ucenter_corp')->where(array('uid'=>session('Uid')))->getField('phone');
			    		$p_data=M('purchase_project')->field('pid,pname,sources')->where(array('pid'=>$pid))->find();
                        $as = M('purchase_project')->where(array('pid'=>$pid))->save(array('sign_time'=>time()));
                        //2018-10-20更新 表达意向功能-------------开始-------------------------
			    	    if($_POST['intention']==1){
				    		$upload = new \Think\Upload();// 实例化上传类
						    $upload->maxSize   =     3145728 ;// 设置附件上传大小
						    $upload->exts      =     array('jpg', 'gif', 'png', 'jpeg','pdf');// 设置附件上传类型
						    $upload->rootPath  =     './Public/intention/'; // 设置附件上传根目录
						    $upload->autoSub   = false;
						    $upload->replace   = true;
						    $upload->saveName  = '1_intention_'.session('Uid');
						    // 上传文件 
						    $info   =   $upload->uploadOne($_FILES['files']);
						    if(!$info) {// 上传错误提示错误信息
						        $msg=array('status'=>0,'msg'=>$upload->getError());
						        echo json_encode($msg);die;
						    }else{// 上传成功
						       $intention=$info['savename'];
						    }
				    	}else{
				    		 $intention=0;//默认为false
			    	  	}
			    	   //2018-10-20更新 表达意向功能-------------结束-------------------------
				    	$data=array(
				    		'userid'  =>session('Uid'),
				    		'projid'  =>$pid,
				    		'pname'   =>$p_data['pname'],
		    				'url'     =>U('Purchase/project_show',array('pid'=>$pid,'sources'=>$p_data['sources'])),
				    		'signtime'=>time(),
				    		'status'  =>3,
				    		'files'  =>$intention,  //意向表达
				    		);
				    	$where=array();
			    		$where['userid']=session('Uid');
		    			$where['projid']=$pid;
				    	if(M('project_sign')->where($where)->find()){
				    		$rs=M('project_sign')->where($where)->save($data);	
				    	}else{
				    		$rs=M('project_sign')->add($data);	
				    	}			    	
				    	if($rs){
				    		//报名成功
				    		//采购报名消息
							$model = D('BacklogMsg');
							if($intention==0){
								//意向表达
								$model->intentionmsg($data);
							}else{
								//项目报名
								$model->signmsg($data);
							}
							if(I('post.edit') == 'edit'){
                                $msg=array('status'=>1,'msg'=>'修改成功，请耐心等待审核结果');
                            }else{
                                $msg=array('status'=>1,'msg'=>'报名成功','url'=>U('Purchase/sign_success',array('pid'=>$pid,'intention'=>$_POST['intention'])));
                            }

				    	}else{
				    		$msg=array('status'=>0,'msg'=>'报名失败');
				    	}
			    		break;
			    	case 1:	
		    			$msg=array('status'=>3,'msg'=>'您的企业信息未提交审核，请前往【会员中心-账号管理-企业信息】处完善并提交审核，审核通过后即可报名参与项目','url'=>U('Member/ucenter_corp'));
		    			break;
			    	case 2:
			    		$msg=array('status'=>3,'msg'=>'您的企业信息正在审核中，请前往【会员中心】查看审核状态，审核通过后即可报名参与项目','url'=>U('Member/index'));
			    		break;
			    	case 4:
			    		$msg=array('status'=>3,'msg'=>'您的企业信息提交审核后未通过，请前往【会员中心-账号管理-企业信息】处修改并再次提交审核，审核通过后即可报名参与项目','url'=>U('Member/ucenter_corp'));
			    		break;
		    	}			
	    	}	
    	}else{
            $refer = $_SERVER ['HTTP_REFERER'];
            Cookie('refer', $refer);
    		$msg=array('status'=>2,'msg'=>'未登录','url'=>U('Login/login'));
    	}
	    echo json_encode($msg);	
    }
    //报名成功
    public function sign_success($pid){
    	//防止非法操作  
    	if(M('project_sign')->where(array('userid'=>session('Uid'),'projid'=>$pid))->find()){
    		//查询联系人电话
    		$data=array();
    		$phone=M('ucenter_corp')->where(array('uid'=>session('Uid')))->getField('phone');
    		//查询项目相关信息
    		$data=M('purchase_project')->field('pid,pname,image,countryid,business_id,buy_type,pay_type,sources')->where(array('pid'=>$pid))->find();
    		//var_dump($phone);
    		
    		//根据报名项目的行业分类推荐项目
    		$where=array();
    		$where['business_id']=$data['business_id'];
    		$where['input_time']=array('lt',time());
    		$where['pid']=array('neq',$pid);
    		$jian_data=M('purchase_project')->field('pid,pname,image,countryid,business_id,buy_type,pay_type,sources,input_time')->where($where)->limit(6)->order('input_time DESC')->select();
    		$this->assign('jian_data',$jian_data);
    		$this->assign('phone',$phone);
    		$this->assign('data',$data);
    		$this->display();
    	}else{
    		//重定向到404
    		$this->redirect('404');
    	}
    }
    //项目收藏
    public function collect(){
    	$pid=$_POST['pid'];
    	//限制用户必须登录
    	//session('Uid','180518001');
    	if(session('Uid')){
	    	//用户已登录
	    	$map=array();
	    	$map['userid']=session('Uid');
	    	$map['projid']=$pid;
	    	$map['state']=1;
	    	if(M('project_collect')->where($map)->find()){
	    		$msg=array('status'=>1,'msg'=>'您已收藏过该项目');
	    	}else{
		    	$p_data=M('purchase_project')->field('pid,pname,sources')->where(array('pid'=>$pid))->find();
		    	$data=array(
		    		'userid'  =>session('Uid'),
		    		'projid'  =>$pid,
		    		'pname'   =>$p_data['pname'],
    				'url'     =>U('Purchase/project_show',array('pid'=>$pid,'sources'=>$p_data['sources'])),
		    		'collecttime'=>time(),
		    		'type'		 =>$_POST['type'],
		    		'state'  =>1
		    		);
		    	$where=array();
		    	$where['userid']=session('Uid');
	    		$where['projid']=$pid;
		    	if(M('project_collect')->where($where)->find()){
		    		$rs=M('project_collect')->where($where)->save($data);	
		    	}else{
		    		$rs=M('project_collect')->add($data);	
		    	}			    	
			    if($rs){
		    		//报名成功
		    		//采购收藏消息
					$model = D('BacklogMsg');				
					$model->collectmsg($data);
		    		$msg=array('status'=>1,'msg'=>'收藏成功');
		    	}else{
		    		$msg=array('status'=>0,'msg'=>'收藏失败');
		    	}	
	    	}	
    	}else{
            $refer = $_SERVER ['HTTP_REFERER'];
            Cookie('refer', $refer);
    		$msg=array('status'=>2,'msg'=>'未登录','url'=>U('Login/login'));
    	}
	    echo json_encode($msg);	
    }
    //取消收藏
    public function uncollect(){
    	$pid=$_POST['pid'];
    	//用户已登录
    	$map['userid']=session('Uid');
    	$map['projid']=$pid;
	    $data=array('userid'=>session('Uid'),'projid'=>$pid,'collecttime'=>time(),'state'=>0);
    	if(M('project_collect')->where($map)->save($data)){
    		//报名成功
    		$msg=array('status'=>3,'msg'=>'收藏取消成功');
    	}else{
    		$msg=array('status'=>0,'msg'=>'取消失败');
    	}		
	    echo json_encode($msg);	
    }

    //文件下载
    public function download(){
        if($uid = session('Uid')){
            $data = array(
                'closure'=>I('post.path'),
                'file_name'=>I('post.name')
            );
            //header('Content-type: text/html;charset=utf-8');
            if($data){
                $file_url = WORKING_PATH . $data['closure'];
                $out_filename = $data['file_name'];
                //$file_url = “./服务器文件路径”
                //$out_filename = ‘下载后自动保存的名字’;
                if(!file_exists($file_url)) {
                    echo "不存在";
                }else {
                    header('Accept-Ranges: bytes');
                    header('Accept-Length: ' . filesize($file_url));
                    header('Content-Transfer-Encoding: binary');
                    header('Content-type: application/octet-stream');
                    header('Content-Disposition: attachment; filename=' . $out_filename);
                    header('Content-Type: application/octet-stream; name=' . $out_filename);
                    if (is_file($file_url) && is_readable($file_url)) {
                        $file = fopen($file_url, "r");
                        echo fread($file, filesize($file_url));
                        fclose($file);
                    }
                }
            }else{
                //传过来的路径有问题
            }

        }else{
            $refer = $_SERVER ['HTTP_REFERER'];
            Cookie('refer', $refer);
            $this->redirect('Login/login');
        }
    }

    //文件下载
    /*public function download()
    {
        $id = I('get.id');
        $sources = I('get.sources');
        switch ($sources){
            case 1:
                $sources = 'agency';
                break;
            case 2:
                $sources = 'owner';
                break;
            case 3:
                $sources = 'website';
                break;
        }
        $tb = 'cross_project_' . $sources;
        $data = M($tb)->where(array('sitid' => $id))->find();
        dump($data);
        //dump(M($tb)->_sql);
        //dump($data);die;
        if ($data) {
            $file_url = WORKING_PATH . $data['closure'];
            $out_filename = $data['file_name'];
            //$file_url = “./服务器文件路径”
            //$out_filename = ‘下载后自动保存的名字’;
            if (!file_exists($file_url)) {
                echo "不存在";
            } else {
                header('Accept-Ranges: bytes');
                header('Accept-Length: ' . filesize($file_url));
                header('Content-Transfer-Encoding: binary');
                header('Content-type: application/octet-stream');
                header('Content-Disposition: attachment; filename=' . $out_filename);
                header('Content-Type: application/octet-stream; name=' . $out_filename);
                if (is_file($file_url) && is_readable($file_url)) {
                    $file = fopen($file_url, "r");
                    echo fread($file, filesize($file_url));
                    fclose($file);
                }
            }
        } else {
            $this->error('非法操作！');
        }
    }*/
}