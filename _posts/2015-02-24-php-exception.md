---
layout: post
title: 优雅地处理站点错误
categories: code
---

首先举两个我经常看到的错误处理方法 = =!!，以及我认为这些方法存在的问题。


1. 发生错误返回一个错误码，使得你不得不在调用完函数后立即处理错误返回。这样会使你的代码很杂乱，包含各种if-else和错误处理代码。代码的阅读行很糟糕。

		function foo(){

			if(){
				return 1; //错误1
			}

			if(){
				return 2; //错误2
			}else{
				return 3; //错误3
			}

		}

2. 发生错误的时候返回一个数组，包含错误码和错误信息。 同样你也得立即处理你的返回错误。

		function bar(){
			 $error = array();

			 $error[] = array('flag'=>1, 'someting error occur..');
			 $error[] = array('flag'=>2, 'another error occur..');

			 if(!empty($error)){
			 	return $error;
			 }

			 return true;
		}

那么如何使代码的错误处理更优雅，能更好的表达你的业务逻辑，而不是纠缠在错误处理中呢？

**我个人推荐使用异常来处理你的站点错误，异常能很好的解决我上面提到的问题。**

- 通过自定义异常，你能更好的在一个地方处理你的错误，而不是写的到处都是
- 通过使用异常， 省去繁杂的if-else判断，使代码跟简洁，突出中心思想。

##下面用简单代码介绍一下我使用的异常方案

1. 定义一个全局的类，用来保存你站点的错误码和对应的错误信息

		/**
		 * 站点错误码/错误码描述类
		 * @author zhoushen 
		 */
		class ExceptionCode{
			const UPLOAD_FILE_TOO_LARGE = 1000;
			const USER_NOT_FOUND = 2000;

			//定义错误码的描述文字
			public static $msg = array(
					self::UPLOAD_FILE_TOO_LARGE => '上传文件太大了',
					self::USER_NOT_FOUND => '用户未找到',
				);
		}

2. 定义一个抽象的异常基类，用户自定义异常继承这个类。

		/**
		 * 基础异常处理类,用户异常继承自这个类
		 */
		abstract class BaseException extends Exception{

			public $message;
			public $code;

			public function __construct($code){
				$this->code = $code;
				$this->message = ExceptionCode::$msg[$code];
				parent::__construct($this->message, $this->code);
			}

			//默认异常处理函数
			public function handle(){
				//这里可以把异常信息持久化到数据库，文件中，方便排错。
				echo '--异常已经存入数据库:' . $this->message;
			}
		}

3. 定义一个默认的异常处理句柄类，用来自动处理未捕获的异常

		/**
		 * 异常处理句柄
		 */
		class ExceptionHandle{

			/**
			 * 默认异常处理函数
			 * @param  [type] $e [description]
			 * @return [type]    [description]
			 * @author zhoushen
			 */
			static function deal($e){

				//执行用户自定义异常处理函数
				if( method_exists($e, 'handle') ){
					$e->handle();
				}

				if( static::isAjax() ){
					exit( json_encode( array('code' => $e->getCode(),'msg'  => $e->getMessage()) ) );
				}else{
					//这里可以include你站点的异常处理页面
					echo $e;
				}
			}
				
			/**
			 * 判断是否是ajax
			 * @return boolean [description]
			 * @author zhoushen
			 */
			static function isAjax(){
				$r = isset($_SERVER['HTTP_X_REQUESTED_WITH']) ? strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) : '';
		    	return $r == 'xmlhttprequest';
			}
		}

4. 在你框架的执行流中加入自定义的异常处理句柄

		//指定异常处理句柄
		set_exception_handler(array('ExceptionHandle', 'deal'));

5. 现在来测试一下我们的异常方案

		/*
		 以下输出： --异常已经存入数据库:上传文件太大了
		 exception 'UploadException' with message '上传文件太大了' in F:\wamp\www\index.php:90 Stack trace: #0 {main}
		*/
		throw new UploadException(ExceptionCode::Upload_FILE_NOT_FOUNT);

		/*
		以下输出： 
		exception 'NotBadException' with message '用户未找到' in F:\wamp\www\index.php:99 Stack trace: #0 {main}
		 */
		throw new NotBadException(ExceptionCode::USER_NOT_FOUND);

