'use client';

import Image from 'next/image';
import Button from '@/components/Button';

const ActionButton = (props) => {

    const { 
        styles, 
        handleClick,
        isDisabled,
        imageSrc,
        children,
        ...rest
    } = props;

    return (
        <Button
            styles={styles}
            handleClick={handleClick}
            isDisabled={false}
            {...rest}
        >
            <Image 
                src={imageSrc}
                width={30}
                height={30}
                alt={'action-button-image'}
            />
            <div className="pl-2 font-bold">
              <pre>
                {children}
              </pre>
            </div>
        </Button>
    )
}

Button.defaultProps = {
    isDisabled: false
}

export default ActionButton;
