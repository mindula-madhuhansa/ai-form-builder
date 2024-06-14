import { ChangeEvent } from "react";

import { QuestionSelectModel } from "@/types/form-types";
import { FieldOptionSelectModel } from "@/types/form-types";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { FormControl } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

type Props = {
  element: QuestionSelectModel & {
    fieldOptions: Array<FieldOptionSelectModel>;
  };
  value: string;
  onChange: (
    value?:
      | string
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLTextAreaElement>
  ) => void;
};

export const FormField = ({ element, value, onChange }: Props) => {
  if (!element) return null;

  const components = {
    Input: () => <Input type="text" onChange={onChange} />,
    Switch: () => (
      <Switch
        onCheckedChange={(checked: boolean) => {
          onChange(checked ? "true" : "false");
        }}
      />
    ),
    Textarea: () => <Textarea onChange={onChange} />,
    Select: () => (
      <Select onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue>Select an option</SelectValue>
        </SelectTrigger>
        <SelectContent>
          {element.fieldOptions.map((option, index) => (
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
        {element.fieldOptions.map((option, index) => (
          <div
            key={`${option.text} ${option.value}`}
            className="flex items-center space-x-2"
          >
            <FormControl>
              <RadioGroupItem
                value={`answerId_${option.id}`}
                id={option?.value?.toString() || `answerId_${option.id}`}
              >
                {option.text}
              </RadioGroupItem>
            </FormControl>
            <Label className="text-base">{option.text}</Label>
          </div>
        ))}
      </RadioGroup>
    ),
  };

  return element.fieldType && components[element.fieldType]
    ? components[element.fieldType]()
    : null;
};
