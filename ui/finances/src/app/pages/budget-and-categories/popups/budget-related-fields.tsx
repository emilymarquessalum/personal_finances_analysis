import { Checkbox, Form, InputNumber, Radio } from 'antd';
import React, { useState } from 'react';

export default function BudgetRelatedFields() {
    const [showBudgetFields, setShowBudgetFields] = useState(false);
    const [budgetType, setBudgetType] = useState<'absolute' | 'percentage'>('absolute');

    return (
        <div>
            <Form.Item
                name="hasBudget"
                valuePropName="checked"
            >
                <Checkbox onChange={(e) => setShowBudgetFields(e.target.checked)}>
                    Add Budget to Category
                </Checkbox>
            </Form.Item>

            {showBudgetFields && (
                <>
                    <Form.Item name="budgetType" label="Budget Type">
                        <Radio.Group 
                            value={budgetType} 
                            onChange={(e) => setBudgetType(e.target.value)}
                        >
                            <Radio value="absolute">Fixed Amount</Radio>
                            <Radio value="percentage">Income Percentage</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item
                        name="maxValue"
                        label={budgetType === 'absolute' ? "Maximum Budget Value" : "Income Percentage"}
                        rules={[{ required: true, message: 'Please enter a value' }]}
                    >
                        <InputNumber
                            style={{ width: '100%' }}
                            formatter={value => budgetType === 'absolute' 
                                ? `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                : `${value}%`
                            } 
                            min={budgetType === 'percentage' ? 0 : undefined}
                            max={budgetType === 'percentage' ? 100 : undefined}
                            placeholder={budgetType === 'absolute' 
                                ? "Enter maximum value" 
                                : "Enter percentage of income"
                            }
                        />
                    </Form.Item>

                    <Form.Item
                        name="desiredFutureValue"
                        label={budgetType === 'absolute' 
                            ? "Future Desired Budget Value" 
                            : "Future Desired Income Percentage"
                        }
                    >
                        <InputNumber
                            style={{ width: '100%' }}
                            formatter={value => budgetType === 'absolute'
                                ? `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                : `${value}%`
                            } 
                            min={budgetType === 'percentage' ? 0 : undefined}
                            max={ undefined}
                            placeholder={budgetType === 'absolute'
                                ? "Enter target value"
                                : "Enter target percentage"
                            }
                        />
                    </Form.Item>

                    <Form.Item
                        name="isPercentageBased"
                        hidden
                    >
                        <InputNumber value={budgetType === 'percentage' ? 1 : 0} />
                    </Form.Item>
                </>
            )}
        </div>
    );
}