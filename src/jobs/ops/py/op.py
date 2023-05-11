from abc import ABC, abstractmethod

class Op(ABC):
    @abstractmethod
    def execute(self):
        pass