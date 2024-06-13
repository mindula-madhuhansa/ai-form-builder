import { ChangeEvent } from "react";

import {
  QuestionSelectModel,
  FieldOptionSelectModel,
} from "@/types/form-types";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { FormControl } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

type Props = {
  element: QuestionSelectModel & {
    fieldOptions: Array<FieldOptionSelectModel>;
  };
  value: string;
  onChange: (value?: string | ChangeEvent<HTMLInputElement>) => void;
};

export const FormField = ({ element, value, onChange }: Props) => {
  if (!element) return null;

  const components = {
    Input: () => <Input type="text" onChange={onChange} />,
    Switch: () => <Switch />,
    Textarea: () => <Textarea />,
    Select: () => (
      <Select onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue>Select an option</SelectValue>
        </SelectTrigger>
        <SelectContent>
          {element.fieldOptions.map((option) => (
            <SelectItem
              key={`${option.text} ${option.value}`}
              value={`answerId_${option.id}`}
            >
              {option.text}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    ),
    RadioGroup: () => (
      <RadioGroup onValueChange={onChange}>
        {element.fieldOptions.map((option) => (
          <div
            key={`${option.text} ${option.value}`}
            className="flex items-center space-x-2"
          >
            <FormControl>
              <RadioGroupItem
                id={option.value?.toString() || `answerId_${option.id}`}
                value={`answerId_${option.id}`}
              >
                {option.text}
              </RadioGroupItem>
            </FormControl>
            <Label
              htmlFor={option.value?.toString() || `answerId_${option.id}`}
              className="text-base"
            >
              {option.text}
            </Label>
          </div>
        ))}
      </RadioGroup>
    ),
  };

  return element.fieldType && components[element.fieldType]
    ? components[element.fieldType]()
    : null;
};
