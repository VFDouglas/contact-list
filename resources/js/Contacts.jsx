import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import {Col, Container, Row} from 'react-bootstrap';
import {
    Input, Tooltip, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,
    Link, Spinner, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure,
    Card, CardHeader, CardBody, Divider, Image, Chip, NextUIProvider,
} from '@nextui-org/react';
import {
    faMagnifyingGlass,
    faPhone,
    faEnvelope,
    faMagnifyingGlassPlus,
    faCircleInfo,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Pagination} from './components/Pagination.jsx';
import {EmptyTable} from './components/EmptyTable.jsx';

export function Contacts() {
    const [showModal, setShowModal]             = useState(false);
    const [page, setPage]                       = useState(1);
    const [total, setTotal]                     = useState(0);
    const [contacts, setContacts]               = useState([]);
    const [contactSearch, setContactSearch]     = useState('');
    const [isLoadingSearch, setIsLoadingSearch] = useState(true);
    const [matriculaModal, setMatriculaModal]   = useState('');
    const [nameModal, setNameModal]             = useState('');
    const [emailModal, setEmailModal]           = useState('');
    const [birthDateModal, setBirthDateModal]   = useState('');
    const [phoneModal, setPhoneModal]           = useState([]);
    const [departmentModal, setDepartmentModal] = useState('');
    const [imageModal, setImageModal]           = useState('');
    const [limitPage, setLimitPage]             = useState(20);

    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const DATE_FORMAT = new Intl.DateTimeFormat('en-US', {
        year : 'numeric',
        month: 'short',
        day  : 'numeric',
    });

    function showLoading(isLoading = true, isDOMLocked = true) {
        document.activeElement.blur();
        if (isLoading) {
            if (isDOMLocked) {
                document.body.classList.add('pe-none');
            }
            document.querySelector('#spinner_react').classList.remove('d-none');
        } else {
            document.body.classList.remove('pe-none');
            document.querySelector('#spinner_react').classList.add('d-none');
        }
    }

    async function searchContacts(params = {}) {
        params.search = contactSearch.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

        let options = {
            method: 'GET',
        };

        if (params.limit) {
            setLimitPage(params.limit);
        }
        let offset = limitPage * ((params.page || 1) - 1);

        showLoading();

        let url = `https://dummyjson.com/users`;
        if (params.search) {
            url += `/search`;
        }
        const urlParams = new URLSearchParams({
            skip : offset,
            limit: limitPage,
            q    : params.search || '',
        });

        let response     = await fetch(url + `?${urlParams.toString()}`, options);
        let jsonResponse = await response.json();

        setTotal(jsonResponse.total || 0);
        setPage(params.page || 1);
        setContacts(jsonResponse.users);
        setIsLoadingSearch(false);
        showLoading(false);
    }

    function contactDetail(params) {
        console.log(params);
        setNameModal(params.firstName + ' ' + params.lastName);
        setEmailModal(params.email || '');
        setBirthDateModal(DATE_FORMAT.format(new Date(params.birthDate)) || '');
        setPhoneModal(params.phone || '');
        setDepartmentModal(params.company.department || '');
        setImageModal(params.image || '');
    }

    useEffect(() => {
        searchContacts().then();
    }, []);

    return (
        <NextUIProvider>
            <Spinner color="primary" size="lg" className="d-none" id="spinner_react"/>
            <Modal isOpen={isOpen} onOpenChange={() => {onOpenChange();}} id="modal_contacts" placement="top-center"
                   size="3xl">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Contact</ModalHeader>
                            <ModalBody>
                                <Row>
                                    <Col xs={12}>
                                        <Card fullWidth={false}>
                                            <CardHeader className="flex gap-3">
                                                <Image
                                                    alt={`${nameModal}'s picture`} isBlurred isZoomed
                                                    height={80}
                                                    radius="sm"
                                                    src={imageModal}
                                                    width={80}
                                                />
                                                <div className="flex flex-col">
                                                    <p className="text-md fw-bold">{nameModal}</p>
                                                    <p className="text-small text-default-500 text-success-emphasis">
                                                        {departmentModal}
                                                    </p>
                                                    <p className="text-small text-default-500 text-primary-emphasis">
                                                        {birthDateModal}
                                                    </p>
                                                </div>
                                            </CardHeader>
                                            <Divider/>
                                            <CardBody>
                                                {emailModal ?
                                                    <Chip color="success" variant="flat" className="px-3 mb-2"
                                                          startContent={<FontAwesomeIcon icon={faEnvelope}/>}>
                                                        {emailModal}
                                                    </Chip> : ''
                                                }
                                                <div>
                                                    {phoneModal ?
                                                        <Chip color="primary" variant="flat" className="px-3 me-1"
                                                              key={`fone-${phoneModal}`}
                                                              startContent={<FontAwesomeIcon icon={faPhone}/>}>
                                                            {phoneModal}
                                                        </Chip> : ''
                                                    }
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                </Row>
                            </ModalBody>
                            <ModalFooter/>
                        </>
                    )}
                </ModalContent>
            </Modal>
            <Container fluid className="mt-5">
                <form id="form_search_contact" onSubmit={e => {
                    e.preventDefault();
                    searchContacts().then();
                }}>
                    <Row className="justify-content-between mx-3 align-items-baseline">
                        <Col xs={12} sm lg={5} xxl className="my-3">
                            <Pagination total={total} page={page} maximum={limitPage} shadow={true}
                                        callback={searchContacts} color="primary"/>
                        </Col>
                        <Col xs={12} sm={6} xl className="d-flex align-items-baseline my-3">
                            <Input isClearable label="Search" placeholder="Search for a name"
                                   size="sm" className="w-100" onClear={() => {setContactSearch('');}}
                                   onChange={(event) => {setContactSearch(event.target.value);}}/>
                        </Col>
                        <Col xs={12} sm={6} xl className="my-3">
                            <Button type="submit" color="primary" className="w-100"
                                    onPress={(e) => {searchContacts().then();}} isLoading={isLoadingSearch}
                                    startContent={<FontAwesomeIcon icon={faMagnifyingGlass}/>}>
                                Search
                            </Button>
                        </Col>
                    </Row>
                </form>
                <Row className="m-3">
                    <Col className="table-responsive">
                        <Table aria-label="Example table with dynamic content" css={{height: 'auto', minWidth: '100%'}}
                               isStriped align="center">
                            <TableHeader>
                                <TableColumn align="start" key="fullName">
                                    Name
                                </TableColumn>
                                <TableColumn key="birthDate">
                                    Birth Date
                                </TableColumn>
                                <TableColumn align="start" key="setor">
                                    Department
                                </TableColumn>
                                <TableColumn>Email</TableColumn>
                                <TableColumn>Phone</TableColumn>
                                <TableColumn>&nbsp;</TableColumn>
                            </TableHeader>
                            <TableBody items={contacts} emptyContent={
                                <EmptyTable isLoading={isLoadingSearch} rows={10} columns={7}/>
                            }>
                                {(item) => (
                                    <TableRow key={item.id ?? `row-${item.id}`}>
                                        <TableCell align="start">
                                            {item.firstName + ' ' + item.lastName}
                                        </TableCell>
                                        <TableCell>
                                            {DATE_FORMAT.format(new Date(item.birthDate)) || ''}
                                        </TableCell>
                                        <TableCell align="start">
                                            {item.company.department || ''}
                                        </TableCell>
                                        <TableCell>
                                            <Link href={'mailto:' + item.email || ''} underline="none">
                                                {item.email || ''}
                                            </Link>
                                        </TableCell>
                                        <TableCell>
                                            <Link href={'tel:' + item.phone || ''} underline="none">
                                                {item.phone || ''}
                                            </Link>
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                size="sm" variant="flat"
                                                onClick={() => {
                                                    onOpen();
                                                    contactDetail(item);
                                                }}>
                                                <FontAwesomeIcon
                                                    icon={faCircleInfo}
                                                    className="cursor-pointer text-primary"
                                                    size="lg"/>
                                                Details
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        </NextUIProvider>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Contacts/>
    </React.StrictMode>,
);
