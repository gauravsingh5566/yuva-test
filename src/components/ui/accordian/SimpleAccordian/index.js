import React from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import classNames from 'classnames';
import {ChevronDownIcon} from '@radix-ui/react-icons';
import './styles.css';
import {InfoCard} from './InfoCard';

export const SimpleAccordion = ({data}) => (
    <Accordion.Root className="AccordionRoot" type="single" defaultValue="" collapsible>
        {
            data?.map((accItem, accIndex) => {
                return <Accordion.Item key={accIndex} className="AccordionItem" value={"item-" + (accIndex + 1)}>
                    <AccordionTrigger>{accItem?.btnText}</AccordionTrigger>
                    <AccordionContent>{accItem?.body?.map((info, i) => {
                        return <InfoCard info={info} />
                    })}</AccordionContent>
                </Accordion.Item>
            })
        }
    </Accordion.Root>
);

const AccordionTrigger = React.forwardRef(({children, className, ...props}, forwardedRef) => (
    <Accordion.Header className="AccordionHeader">
        <Accordion.Trigger
            className={classNames('AccordionTrigger', className)}
            {...props}
            ref={forwardedRef}
        >
            {children}
            <ChevronDownIcon className="AccordionChevron" aria-hidden />
        </Accordion.Trigger>
    </Accordion.Header>
));

const AccordionContent = React.forwardRef(({children, className, ...props}, forwardedRef) => (
    <Accordion.Content
        className={classNames('AccordionContent', className)}
        {...props}
        ref={forwardedRef}
    >
        <div className="AccordionContentText">{children}</div>
    </Accordion.Content>
));

