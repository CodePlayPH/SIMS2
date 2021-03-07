import { IconButton } from '@material-ui/core'
import { ArrowBack } from '@material-ui/icons'
import React from 'react'

function TopEntries(props) {
    const { onGoBack } = props;

    return (
        <div>
            <IconButton color="primary" aria-label="upload picture" component="span" onClick={() => { onGoBack() }} >
                <ArrowBack />
            </IconButton>
        </div>
    )
}

export default TopEntries
