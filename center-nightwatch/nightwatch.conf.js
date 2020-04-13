module.exports = {
    'src_folders': [
        'case'
    ],
    'output_folder': 'reports',
    'custom_commands_path': '',
    'custom_assertions_path': '',
    'page_objects_path': '',
    'globals_path': '',
    'selenium': {
        'start_process': true,
        'server_path': require('selenium-server').path,
        'log_path': '',
        'host': '127.0.0.1',
        'port': 4444,
        'cli_args': {
            'webdriver.chrome.driver': require('chromedriver').path
        }
    },
    'test_settings': {
        'default': {
            'launch_url': 'http://localhost',
            'selenium_port': 4444,
            'selenium_host': 'localhost',
            'silent': true,
            'screenshots': {
                'enabled': false,
                'path': ''
            },
            'desiredCapabilities': {
                'browserName': 'chrome',
                'marionette': true,
                'chromeOptions': {
                    'w3c': false
                }
            }
        },
        'chrome': {
            'desiredCapabilities': {
                'browserName': 'chrome',
                'chromeOptions': {
                    'w3c': false
                }
            }
        },
        'edge': {
            'desiredCapabilities': {
                'browserName': 'MicrosoftEdge'
            }
        }
    }
}