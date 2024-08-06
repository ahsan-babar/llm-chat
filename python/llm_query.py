import os
from transformers import AutoModelForCausalLM, AutoTokenizer
from util import directory_exists_and_has_files

class LLM:
    MODELS = {}
    TOKENIZERS = {}

    def __init__(self, llm):
        self.llm = llm
        self.model_name = self.get_model_name(llm)
        self.tokenizer = self.get_tokenizer(self.model_name)
        self.model = self.get_model(self.model_name)

    @staticmethod
    def get_model_name(llm):
        if llm == 'mistral':
            return os.getenv('MISTRAL_MODEL_ID', 'mistralai/Mistral-7B-Instruct-v0.2')
        elif llm == 'llama2':
            return os.getenv('LLAMA_MODEL_ID', 'meta-llama/Llama-2-7b-chat-hf')
        else:
            print('Invalid LLM model. Using placeholder model, openai-community/gpt2')
            return 'openai-community/gpt2'

    @classmethod
    def get_tokenizer(cls, model_name):
        if model_name not in cls.TOKENIZERS:
            if directory_exists_and_has_files(f"./cache/tokenizer/{model_name}"):
                print(f"{model_name} tokenizer loading from cache directory . . .")
                cls.TOKENIZERS[model_name] = AutoTokenizer.from_pretrained(f"./cache/tokenizer/{model_name}")
                print(f"{model_name} tokenizer loaded successfully from cache directory")
            else:
                print(f"{model_name} tokenizer not found in the directory. Downloading from Hugging Face . . .")
                tokenizer = AutoTokenizer.from_pretrained(model_name)
                tokenizer.save_pretrained(f"./cache/tokenizer/{model_name}")
                cls.TOKENIZERS[model_name] = tokenizer
                print(f"{model_name} tokenizer loaded successfully from hugging face")

        return cls.TOKENIZERS[model_name]

    @classmethod
    def get_model(cls, model_name):
        if model_name not in cls.MODELS:
            if directory_exists_and_has_files(f"./cache/model/{model_name}"):
                print(f"{model_name} model loading from cache directory . . .")
                cls.MODELS[model_name] = AutoModelForCausalLM.from_pretrained(f"./cache/model/{model_name}")
                print(f"{model_name} model loaded successfully from cache directory")
            else:
                print(f"{model_name} model not found in the directory. Downloading from Hugging Face . . .")
                model = AutoModelForCausalLM.from_pretrained(model_name)
                model.save_pretrained(f"./cache/model/{model_name}")
                cls.MODELS[model_name] = model
                print(f"{model_name} model loaded successfully from hugging face")

        return cls.MODELS[model_name]

    def ask(self, question, context=''):
        input_text =  context  + '\n'+ question
        input_ids = self.tokenizer(input_text, return_tensors="pt")
        outputs = self.model.generate(**input_ids, max_new_tokens= 500)
        return self.tokenizer.decode(outputs[0])