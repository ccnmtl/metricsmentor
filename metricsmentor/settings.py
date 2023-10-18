# flake8: noqa
from metricsmentor.settings_shared import *

try:
    from metricsmentor.local_settings import *
except ImportError:
    pass
