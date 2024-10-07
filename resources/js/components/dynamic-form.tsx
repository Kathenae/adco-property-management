import { useForm } from "@inertiajs/react";
import { Input } from "@/components/ui/input";
import React, { PropsWithChildren, useMemo, useState } from "react";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select"
import { cn, translate as tr } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { FormLabel } from "@/components/ui/form";
import { ImageSelector } from "@/components/ui/image-selector";
import { Textarea } from "@/components/ui/textarea";
import { InputError } from "@/components/ui/input-error";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";


function canShow(input: FormInput, data: Record<string, any>) {
    return (!input.showIf || input.showIf.inValues.includes(data[input.showIf.targetInput]))
}

// Flattens the form inputs into a inputName -> value map
function reduceFormInputs(previous: Record<string, any>, current: FormInput | FormGroup): Record<string, any> {
    if ('inputs' in current) {
        return current.inputs.reduce(reduceFormInputs, previous)
    }
    else {
        return { ...previous, [current.name]: current.value }
    }
}

interface FormGroup {
    title: string,
    inputs: FormInput[],
}

export type DynamicFormInputs = (FormInput | FormGroup)[]

export interface FormInput {
    name: string,
    value: string | number | boolean | any | undefined,
    showIf?: { targetInput: string, inValues: string[] },
    type?: 'text' | 'checkbox' | 'imageselect' | 'number' | 'textarea' | 'file' | 'datetime-local' | 'date' | 'email' | 'password',
    multiple?: boolean,
    accept?: string,
    hideLabel?: boolean,
    helpText?: string,
    choices?: Record<string, string>,
}

interface DynamicInputProps {
    input: FormInput,
    value: any,
    errors: Partial<Record<string, string>>,
    setData: (key: string, value: any) => void,
    onChange?: (input: FormInput, value: any) => void,
}

function DynamicInput({ input, setData, onChange, value, errors }: DynamicInputProps) {

    function handleChange(value: any) {
        setData(input.name, value)
        if (onChange) {
            onChange(input, value)
        }
    }

    function inputs() {
        if (input.choices) {
            return (
                <Select onValueChange={handleChange}>
                    <SelectTrigger>{tr(input.name)}</SelectTrigger>
                    <SelectContent>
                        {Object.keys(input.choices).map((key) => (
                            <SelectItem value={key}>{input.choices && input.choices[key]}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            )
        }

        const basicInput = () => (
            <Input
                type={input.type ?? 'text'}
                name={input.name}
                value={value ?? ''}
                className="mt-1 block w-full"
                onChange={(e) => handleChange(e.currentTarget.value)}
            />
        )

        if (!input.type) {
            return basicInput()
        }

        const inputTypeMap: Record<typeof input.type, React.JSX.Element> = {
            "imageselect": (
                <ImageSelector
                    images={value}
                    onChange={handleChange}
                />
            ),
            "checkbox": (
                <div className="items-top flex">
                    <Checkbox
                        name={input.name}
                        checked={value}
                        className="block mr-2 h-5 w-5"
                        onCheckedChange={handleChange}
                    />
                    <div className="grid gap-1.5 leading-none">
                        <label
                            htmlFor={input.name}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            {tr(input.name)}
                        </label>
                        <p className="text-sm text-muted-foreground">
                            {tr(input.helpText)}
                        </p>
                    </div>
                </div>
            ),
            "textarea": (
                <Textarea value={value} onChange={(e) => handleChange(e.currentTarget.value)} />
            ),
            "file": (
                <Input
                    type={input.type ?? 'text'}
                    name={input.name}
                    multiple={input.multiple ?? false}
                    accept={input.accept ?? '*'}
                    onChange={(e) => handleChange(input.multiple ? e.currentTarget.files : e.currentTarget.files && e.currentTarget.files[0])}
                />
            ),
            "text": basicInput(),
            "email": basicInput(),
            "password": basicInput(),
            "number": basicInput(),
            "date": basicInput(),
            "datetime-local": basicInput(),
        }

        return inputTypeMap[input.type]
    }

    const inputsWithLabel = ['checkbox']
    return (
        <div>
            {!input.hideLabel && !(inputsWithLabel.includes(input.type ?? '')) &&
                <FormLabel htmlFor={input.name} hasErrors={errors && errors[input.name] != null}>{tr(input.name)}</FormLabel>
            }
            {inputs()}
            {Object.keys(errors).map((key) => {
                if (key.startsWith(input.name)) {
                    return <InputError message={errors[key]} className="mt-2" />;
                }
                return null;
            })}
        </div>
    )
}

interface DynamicFormGroupProps {
    group: FormGroup,
    header?: FormHeader,
    data: Record<string, any>,
    errors: Partial<Record<string, string>>,
    collapsable: boolean,
    setData: (key: string, value: any) => void,
    onChange?: (input: FormInput, value: any) => void,
}

function DynamicFormGroup({ group, header, collapsable, data, setData, onChange, errors }: DynamicFormGroupProps) {
    return (
        <>
            {collapsable ?
                <Accordion type="single" collapsible>
                    <AccordionItem value={group.title}>
                        <AccordionTrigger>{group.title}</AccordionTrigger>
                        <AccordionContent>
                        {group.inputs.map((input, index) => (
                            canShow(input, data) ?
                                <DynamicInput
                                    key={`Group_${group.title}@Input_${input.name}@${index}`}
                                    input={input}
                                    value={data[input.name]}
                                    errors={errors}
                                    setData={setData}
                                    onChange={onChange}
                                />
                                : <></>
                        ))}
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
                :
                <>
                    {header && header(group.title)}            
                    {group.inputs.map((input, index) => (
                        canShow(input, data) &&
                        <DynamicInput
                            key={`Group_${group.title}@Input_${input.name}@${index}`}
                            input={input}
                            value={data[input.name]}
                            errors={errors}
                            setData={setData}
                            onChange={onChange}
                        />
                    ))}
                </>
            }
        </>
    )
}

type FormHeader = (title?: string) => React.JSX.Element;

interface DynamicFormProps extends PropsWithChildren {
    submitUrl: string,
    header?: FormHeader,
    asCard?: boolean,
    method: 'post' | 'put' | 'patch',
    inputs: DynamicFormInputs,
    multistep?: boolean,
    className?: string,
    onChange?: (input: FormInput, value: any) => void,
}

export default function DynamicForm({ header, className, inputs, submitUrl, method, multistep, children, onChange, asCard = true }: DynamicFormProps) {
    const initialValues = inputs.reduce(reduceFormInputs, {} as Record<string, any>)
    const { data, setData, post, patch, put, processing, errors, reset } = useForm(initialValues);

    const steps = useMemo(() => inputs.filter(i => 'inputs' in i) as FormGroup[], [inputs]);
    const [activeStepIndex, setActiveStepIndex] = useState(0);
    const activeStep = useMemo(() => steps[activeStepIndex], [activeStepIndex])

    const submit = () => {
        if (method == 'post') {
            post(submitUrl)
        }
        else if (method == 'patch') {
            patch(submitUrl)
        }
        else if (method == 'put') {
            put(submitUrl)
        }
    }

    const handleStep = (back = false) => {
        let nextStepIndex = activeStepIndex + (back ? -1 : 1)
        nextStepIndex = Math.max(0, Math.min(nextStepIndex, steps.length - 1))
        setActiveStepIndex(nextStepIndex)
    }

    const changeStep = (stepIndex: number) => {
        setActiveStepIndex(stepIndex);
    }

    const isFirstStep = () => {
        return activeStepIndex == 0
    }

    const isLastStep = () => {
        return activeStepIndex >= steps.length - 1
    }

    return (
        <>
            <div className={cn(className, asCard && "rounded-lg px-4 py-4 bg-white shadow-lg")}>
                {header && (!multistep || steps.length == 0) && header()}
                <form method={method} encType="multipart/form-data">
                    <div className="space-y-4">
                        {/* Render inputs but filter out the inactive InputGroups but only if the form is multistep */}
                        {inputs.filter(i => !('inputs' in i && multistep && activeStep.title != i.title)).map((input, index) => (
                            ('inputs' in input) ?
                                <DynamicFormGroup
                                    header={header}
                                    collapsable={!multistep}
                                    key={`${input.title}_Group@${index}`}
                                    data={data} errors={errors}
                                    group={input} setData={setData}
                                    onChange={onChange}
                                />
                                :
                                canShow(input, data) && <DynamicInput onChange={onChange} key={`${input.name}_Input@${index}`} input={input} value={data[input.name]} errors={errors} setData={setData} />
                        ))}
                    </div>
                    {children}
                    <div className="flex items-center justify-between mt-8 border-t pt-3">
                        {multistep && steps.length > 0 && !isFirstStep()?
                            <Button type="button" variant='outline' onClick={() => handleStep(true)}>
                                {tr('Previous')}
                            </Button> : <div></div>
                        }
                        {multistep && steps.length > 0 && !isLastStep() ?
                            <Button
                                id="next_button"
                                onClick={() => handleStep()}
                                type={'button'}
                                disabled={processing}
                            >
                                {tr('Next')}
                            </Button>
                            :
                            <Button
                                id="submit_button"
                                type={'button'}
                                onClick={() => submit()}
                                disabled={processing}
                            >
                                {tr('Submit')}
                            </Button>
                        }
                    </div>
                </form>
            </div>
        </>
    )
}