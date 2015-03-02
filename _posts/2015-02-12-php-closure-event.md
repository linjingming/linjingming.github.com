---
layout: post
title: PHP闭包实现事件
categories: code
---


###事件

可以将自定义代码“注入”到现有代码中的特定执行点。附加自定义代码到某个事件，当这个事件被触发时，这些代码就会自动执行。 这样也可进一步解耦业务逻辑，也可以业务无相关的逻辑剥离出来。防止一个很复杂的业务逻辑变得臃肿。

###实现事件基类
    /**
	 * 事件基类
	 */
	abstract class Event{
	
		private $events = array();
	
		/**
		 * 注册事件
		 * @param  [type]  $eventName 事件名称
		 * @param  Closure $func      事件闭包函数
		 * @return [type]             
		 * @author zhoushen
		 */
		function registerEvent($eventName, Closure $func){
			$this->events[$eventName] = $func;
		}
	
		/**
		 * 触发事件
		 * @param  [type] $eventName 事件名称
		 * @return [type]            [description]
		 * @author zhoushen
		 */
		function triggerEvent($eventName){
			if( isset($this->events[$eventName]) ){
				$this->events[$eventName]();
			}
		}
	}

###继承事件基类的某个业务逻辑类

	/**
	 * 实现了事件抽象类的业务逻辑类
	 */
	class Foo extends Event{

		//事件代号
		const END_CREATE_EVENT = 1;

		function create(){
			//do someting
			var_dump('---执行Foo::create业务逻辑---');
			//触发事件
			$this->triggerEvent(self::END_CREATE_EVENT);
		}
	}

###使用事件
	$foo = new Foo;
	//绑定create结束事件
	$foo->registerEvent(Foo::END_CREATE_EVENT, function(){
			var_dump('结束Foo::create动作后触发的事件。');
		});
	//执行create并且触发事件
	$foo->create();

###执行结果

	string '---执行Foo::create业务逻辑---' (length=35)

	string '结束Foo::create动作后触发的事件。' (length=44)

可以看到执行完业务逻辑之后，执行了绑定的事件。