export const appInfo = {
	environment : "<{$__ztCfg.zt_terminal.name}>",
	environmentMode : "<{if $__ztCfg.zt_dev}>DEV<{else}>PRO<{/if}>",
	checkIphone : "<{$__ztCfg.zt_terminal.checkIphone}>",
	mobiLoginUrl : "<{$mobiLoginUrl}>",

	BOX : 'box',
	YOUPAI : 'youpai',
	WAP : 'pc',
	PRO : 'PRO',
	IOS : "ios",
	ANDROID : "android",
	
	"id": "<{$tplCfg.pkg.id}>",
	"packag": "<{$tplCfg.pkg.pkgname}>",
	"appname": "<{$tplCfg.pkg.appname}>",
	"downurl": "<{$tplCfg.pkg.downurl}>",
	"icopath": "<{$tplCfg.pkg.icopath}>",
	"md5_file": "<{$tplCfg.pkg.md5}>",

	"downloadUrlForIos" : '<{$tplCfg.ymnr.urlIos}>',
	"downloadUrlForAdroid" : '<{$tplCfg.ymnr.urlAz}>'
};

